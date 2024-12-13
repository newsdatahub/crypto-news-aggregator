import { render, screen } from '@testing-library/react';
import { NewsCard } from '@/app/components/news-feed';

describe('NewsCard', () => {
  const mockNews = {
    id: '1',
    title: 'Test Title',
    description: 'Test Description',
    article_link: 'https://test.com',
    pub_date: '2024-03-25T12:00:00Z'
  };

  test('renders news item correctly', () => {
    render(<NewsCard item={mockNews} index={0} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('3/25/2024')).toBeInTheDocument();
  });
});