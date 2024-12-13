export interface NewsItem {
    id: string;
    title: string;
    article_link: string;
    description: string;
    pub_date: string;
  }

export interface NewsCardProps {
    index: number;
    item: NewsItem;
}