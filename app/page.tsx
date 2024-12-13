'use client';

import { useState, useEffect } from 'react';
import { PriceTicker } from '@/app/components/price-ticker/PriceTicker';
import styles from './page.module.css';
import { CacheData, NewsItem } from '@/types/';
import { NewsCard } from '@/app/components/news-feed';

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const TOPICS = ['cryptocurrency']

const cache: Record<string, CacheData> = {};

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async (topics: string[]) => {
    const cacheKey = topics.sort().join(',');
    const cachedData: CacheData = cache[cacheKey];
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      setNews(cachedData.data);
      setLastUpdated(new Date(cachedData.timestamp));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryString = topics
        .map(topic => `topic=${encodeURIComponent(topic)}`)
        .join('&');
      
      const response = await fetch(`${API_URL}?language=en&topic=cryptocurrency`, {
        method: 'GET',
        headers: {
          'x-api-key': API_TOKEN,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const articles = await response.json();
      const data: NewsItem[] = articles.data;
      
      cache[cacheKey] = {
        timestamp: Date.now(),
        data
      };
      
      setNews(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(TOPICS);
  }, []);


  const handleRefresh = () => {
    const cacheKey = TOPICS.sort().join(',');
    delete cache[cacheKey];
    fetchNews(TOPICS);
  };

  return (
    <div className={styles.container}>
        <PriceTicker />
      {lastUpdated && (
        <div className={styles.lastUpdated}>
          Last updated: {lastUpdated.toLocaleTimeString()}
          <button onClick={handleRefresh} className={styles.refreshButton}>
            Refresh
          </button>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
      
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        news.map((item: NewsItem, index: number) => (
          <NewsCard key={item.id || index} item={item} index={index} />
        ))
      )}
    </div>
  );
}