import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_API_URL = 'http://test-api.com';
      process.env.NEXT_PUBLIC_API_TOKEN = 'test-token';
      
      global.fetch = jest.fn((url) => {
        if (url.includes('api.coingecko.com')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              bitcoin: { usd: 65000, usd_24h_change: 2.5 }
            }),
            status: 200,
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: [{
              id: '1',
              title: 'News Title',
              description: 'News Description',
              url: 'https://test.com',
              published_at: '2024-03-25'
            }]
          }),
          status: 200,
        } as Response);
      }) as jest.Mock;
    });
  
    test('renders news feed', async () => {
      render(<Home />);
      await waitFor(
        () => expect(screen.getByText("News Title")).toBeInTheDocument(),
        { timeout: 3000 }
      );
    });
  });