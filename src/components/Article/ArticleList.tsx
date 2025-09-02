//! Структура файлів

//? Щоб зробити код більш зрозумілим і масштабованим, ми винесемо частину логіки в окремі файли:

//* Оскільки список статей – це окрема частина інтерфейсу, винесемо його у компонент ArticleList.tsx. Компонент отримає масив статей через проп items і відобразить їх.
//* Створимо файл src/types/article.ts, щоб не дублювати тип Article у різних місцях.
//* У App залишиться логіка запиту, стан і умовний рендер ArticleList.

import type { Article } from '../../types/article';

interface ArticleListProps {
  items: Article[];
}

function ArticleList({ items }: ArticleListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.objectID}>
          <a href={item.url} target="_blank" rel="noreferrer noopener">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
