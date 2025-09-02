// src/services/articleService.ts

import axios from 'axios';
import type { Article } from '../types/article';

interface ArticlesHttpResponse {
  hits: Article[];
}

// HTTP-функція запиту статей
export const fetchArticles = async (topic: string): Promise<Article[]> => {
  const response = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`
  );
  return response.data.hits;
};
//* Функція fetchArticles(topic) повертає проміс масиву статей.
//* Типізація відповіді (ArticlesHttpResponse) локальна – її не потрібно експортувати.
//* Обробка помилки не входить у функцію – вона буде в компоненті.

//* Використовуємо функцію fetchArticles(topic) в компоненті App
