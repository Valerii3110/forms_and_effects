import './App.css';
import Form from '../Form/Form';
import FormActions from '../Form_actions/Form_actions';
import OrderForm from '../OrderForm/OrderForm';
import SearchForm from '../SearchFor/SearchFor';
import { useState } from 'react';
import type { Article } from '../../types/article';
import ArticleList from '../Article/ArticleList';
//* 1. Імпортуємо HTTP-функцію
import { fetchArticles } from '../../services/articleService';

// import { Circles } from 'react-loader-spinner';

// function App() {
//   const handleOrder = (data: string) => {
//     console.log('Order resived form:', data);
//   };

//   const [articles, setArticles] = useState<Article[]>([]);

//   const handleSearch = async (topic: string) => {
//     const response = await axios.get<ArticlesHttpResponse>(
//       `https://hn.algolia.com/api/v1/search?query=${topic}`
//     );
//     console.log(response.data);
//     setArticles(response.data.hits);
//   };

//   return (
//     <>
//       <Form />
//       <hr />
//       <hr />
//       <hr />
//       <FormActions />
//       <hr />
//       <hr />
//       <hr />
//       <h1>Place you order</h1>
//       <OrderForm onSubmit={handleOrder} />
//       <hr />
//       <hr />
//       <hr />
//       <SearchForm onSubmit={handleSearch} />
//       {articles.length > 0 && <ArticleList items={articles} />}
//     </>
//   );
// }

//* Рендеринг за умовою ({articles.length > 0 && ...}) відбувається у компоненті App. Сам компонент ArticleList завжди показує список, якщо його рендерять. Тобто логіка "показати чи ні" – це відповідальність App, а не ArticleList

//! Індикатор завантаження

//* Поки виконується HTTP-запит, у користувача на екрані – порожнє місце, що виглядає як помилка або зависання. Щоб цього уникнути, показують індикатор завантаження.

//? Індикатор – це реактивне значення, тобто його потрібно зберігати в стані компонента. Зазвичай це булевий прапорець:

//* true – запит виконується
//* false – запиту немає або він уже завершився

// function App() {
//   const handleOrder = (data: string) => {
//     console.log('Order resived form:', data);
//   };

//   const [articles, setArticles] = useState<Article[]>([]);
//   //* 1. Додаємо стан індикатора завантаження
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSearch = async (topic: string) => {
//     //* 2. змінюємо індикатор на true перед запитом
//     setIsLoading(true);
//     const response = await axios.get<ArticlesHttpResponse>(
//       `https://hn.algolia.com/api/v1/search?query=${topic}`
//     );
//     //* 3. Змінюємо індикатор на false після запиту
//     setIsLoading(false);
//     console.log(response.data);
//     setArticles(response.data.hits);
//   };

//   return (
//     <>
//       <Form />
//       <hr />
//       <hr />
//       <hr />
//       <FormActions />
//       <hr />
//       <hr />
//       <hr />
//       <h1>Place you order</h1>
//       <OrderForm onSubmit={handleOrder} />
//       <hr />
//       <hr />
//       <hr />
//       <SearchForm onSubmit={handleSearch} />
//       {/* 4. Відображаєм повідомлення про завантаження даних в JSX */}
//       {isLoading && <p>Loading data, please wait...</p>}
//       {articles.length > 0 && <ArticleList items={articles} />}
//       {isLoading && <p>Loading data, please wait...</p>}
//       {articles.length > 0 && <ArticleList items={articles} />}
//     </>
//   );
// }

//* Індикатор завантаження може бути будь-чим: простим текстом, іконкою тощо. Одна з популярних бібліотек – React Loader Spinner, яка надає десятки готових компонентів із різним дизайном.
//! 🧠 Завжди показуйте користувачеві, що дані завантажуються, навіть якщо це триває менше секунди – це покращує UX.

//! Обробка помилок

//? HTTP-запити можуть завершуватися неуспішно – наприклад, через відсутність інтернету або помилку на сервері. Тому завжди потрібно відображати повідомлення про помилку, щоб користувач розумів, що сталося.

//* Для цього:

//* - Додаємо стан isError для відстеження помилки.
//* - Обгортаємо запит у try...catch, щоб перехопити можливу помилку.
//* Виводимо повідомлення, якщо значення isError це true.

// function App() {
//   const handleOrder = (data: string) => {
//     console.log('Order resived form:', data);
//   };

//   const [articles, setArticles] = useState<Article[]>([]);

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   //* 1. Оголошуємо стан
//   const [isError, setIsError] = useState(false);

//   const handleSearch = async (topic: string) => {
//     //* 2. Додаємо блок try...catch
//     try {
//       setIsLoading(true);
//       //* 3. Скидаємо стан помилки в false перед кожним запитом
//       setIsError(false);
//       setIsLoading(true);
//       const response = await axios.get<ArticlesHttpResponse>(
//         `https://hn.algolia.com/api/v1/search?query=${topic}`
//       );

//       setArticles(response.data.hits);
//     } catch {
//       //* 4. Встановлюємо стан isError в true
//       setIsError(true);
//     } finally {
//       //* 5. Встановлюємо стан isLoading в false після будь якого результату запиту
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Form />
//       <hr />
//       <hr />
//       <hr />
//       <FormActions />
//       <hr />
//       <hr />
//       <hr />
//       <h1>Place you order</h1>
//       <OrderForm onSubmit={handleOrder} />
//       <hr />
//       <hr />
//       <hr />
//       <SearchForm onSubmit={handleSearch} />
//       {isLoading && <p>Loading data, please wait...</p>}
//       {/* 6. Використовуємо стан isError щоб показати помилку */}
//       {isError && <p>Whoops, something went wrong! Please try again!</p>}
//       {articles.length > 0 && <ArticleList items={articles} />}
//     </>
//   );
// }
//? Щоб вручну спровокувати помилку і перевірити, як працює блок catch, просто зламайте URL-запиту: // Невірний endpoint — поверне 404 `https://hn.algolia.com/api/v1/search1?query=${topic}`

//! Поділ відповідальності

//* Тримати код HTTP-запитів прямо в компоненті – небажано. З часом компонент:

//* - буде мати зайву логіку не пов’язану з UI;
//* - стане важчим для читання і підтримки;

//? Рішення – винести код запиту в окремий файл, наприклад src/services/articleService.ts. Компоненти повинні тільки викликати функцію й отримувати дані, не турбуючись про адресу бекенду чи формат відповіді.

//* Використовуємо функцію fetchArticles(topic) в компоненті App

function App() {
  const handleOrder = (data: string) => {
    console.log('Order resived form:', data);
  };

  const [articles, setArticles] = useState<Article[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      //* 2. Використовуємо HTTP-функцію
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form />
      <hr />
      <hr />
      <hr />
      <FormActions />
      <hr />
      <hr />
      <hr />
      <h1>Place you order</h1>
      <OrderForm onSubmit={handleOrder} />
      <hr />
      <hr />
      <hr />
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {/* 6. Використовуємо стан isError щоб показати помилку */}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </>
  );
}

//! Навіть в такому простому випадку ми приховали від компонента адресу запиту, типізацію та формат відповіді.

//* Чистий компонент – працює лише з інтерфейсом і станом.
//* Простота підтримки – HTTP-логіку можна змінювати окремо.
//* Масштабованість – легко додати інші сервіси (напр. userService, authService).

//! Компонент просто передає topic і отримує готові articles. Він не знає, звідки вони взялися, і це добре – це і є правильний розподіл обов'язків.

export default App;
