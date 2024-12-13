import { NewsItem } from ".";

export interface CacheData {
    timestamp: number;
    data: NewsItem[];
}