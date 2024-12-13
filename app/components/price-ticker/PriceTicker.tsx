import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { CoinData } from '@/types/';

export const  PriceTicker = () => {
  const [prices, setPrices] = useState<CoinData>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true');
      if (!response.ok) throw new Error('Failed to fetch prices');
      
      const data = await response.json();

      setPrices(data);
      setError(null);
    } catch (err) {
      setError('Failed to load prices');
      console.error('Price fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className={styles.ticker}>Loading prices...</div>;
  if (error) return <div className={styles.ticker}>Price data unavailable</div>;

  return (
    <div className={styles.ticker}>
      {Object.entries(prices).map(([coinId, data]) => {
        const price = data.usd.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        const change = data.usd_24h_change || 0;
        const changeClass = change >= 0 ? styles.positive : styles.negative;

        return (
            <div key={coinId} className={styles.cryptoPrice}>
              <span className={styles.symbol}>{coinId.toUpperCase()}</span>
              <span className={styles.price}>{price}</span>
              <span className={`${styles.change} ${changeClass}`}>
       {change >= 0 ? '↑' : '↓'}
                {Math.abs(change).toFixed(2)}%
     </span>
            </div>
        );
      })}
    </div>
);
}