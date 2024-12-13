import styles from './styles.module.css';
import { NewsCardProps } from '@/types/';

export const NewsCard: React.FC<NewsCardProps> = ({index, item}) => {
    return (
        <div key={index} className={styles.newsCard}>
        <h2 className={styles.newsTitle}>{item.title}</h2>
        <p>{item.description.slice(0, 200)+"..."} Read more 
        <br/>
        <br/>
            <a href={item.article_link} target="_blank"  rel="noopener noreferrer" className={styles.newsLink}>
            {item.article_link}
            </a>    
        </p>

        <div className={styles.newsDate}>
          {new Date(item.pub_date).toLocaleDateString()}
        </div>
      </div>
    )
}
