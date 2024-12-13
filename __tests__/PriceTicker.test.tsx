import { render, screen, waitFor } from '@testing-library/react';
import { PriceTicker } from '@/app/components/price-ticker';

describe('PriceTicker', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              bitcoin: { usd: 65000, usd_24h_change: 2.5 }
            }),
            headers: new Headers(),
            redirected: false,
            status: 200,
            statusText: 'OK',
            type: 'basic',
            url: 'test-url'
          } as Response)
        ) as jest.Mock;
      });

  test('renders crypto prices', async () => {
    render(<PriceTicker />);
    await waitFor(() => expect(screen.getByText('BITCOIN')).toBeInTheDocument(),   { timeout: 3000 }
    );
  });
});