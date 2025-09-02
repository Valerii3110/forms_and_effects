//! HTTP-запити
//? У React немає вбудованого інструмента для HTTP-запитів. Тому використовуємо сторонні бібліотеки, найпопулярніша з них – Axios.
// bash: npm install axios

//? Створимо додаток, в якому є:

//* - форма пошуку статей;
//* - HTTP-запит на API Hacker News;
//* - виведення результатів на сторінку;
//* - обробка станів завантаження та помилки.

//! Форма пошуку

//? HTTP-запити можна виконувати за подією, наприклад, при кліку на елементі чи відправці форми. Компонент форми просто збирає значення з поля і передає їх наверх у пропсі onSubmit

// interface SearchFormProps {
//   onSubmit: (topic: string) => void;
// }

// function SearchForm({ onSubmit }: SearchFormProps) {
//   const handleSubmit = (formData: FormData) => {
//     const topic = formData.get("topic") as string;

//     // Якщо текстове поле порожнє, виводимо повідомлення
// 		// і припиняємо виконання функції.
//     if (topic === "") {
//       alert("Please enter search topic!");
//       return;
//     }

//     // У протилежному випадку викликаємо пропс
// 		// і передаємо йому значення поля
//     onSubmit(topic);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="topic" />
//       <button type="submit">Search</button>
//     </form>
//   );
// }

//! Обробка запиту

//* Запити виконуються не в компоненті форми, а в App, куди вона передає значення. Це дозволяє розділити відповідальність: форма – за інтерфейс, App – за логіку.

// src/components/App.tsx

// import SearchForm from "./SearchForm";

// export default function App() {

//   const handleSearch = async (topic: string) => {
//     // Тут будемо виконувати HTTP-запит
//     console.log(topic);
//   };

//   return (
//     <>
//       <SearchForm onSubmit={handleSearch} />
//     </>
//   );
// }

//* Додамо код HTTP-запиту до Hacker News API всередину асинхронної функції handleSearch.

// src/components/App.tsx

// import axios from "axios";
// import SearchForm from "./SearchForm";

// interface Article {
//   objectID: string;
//   title: string;
//   url: string;
// }

// interface ArticlesHttpResponse {
//   hits: Article[];
// }

// export default function App() {

//   const handleSearch = async (topic: string) => {
// 	  // Виконуємо HTTP-запит
//     const response = await axios.get<ArticlesHttpResponse>(
//       `https://hn.algolia.com/api/v1/search?query=${topic}`
//     );
//     console.log(response.data); // об'єкт з властивістю hits
//   };

//   return (
//     <>
//       <SearchForm onSubmit={handleSearch} />
//     </>
//   );
// }

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // зупиняємо перезавантаження сторінки

    const formData = new FormData(e.currentTarget);
    const topic = formData.get('topic');

    if (!topic || topic.toString().trim() === '') {
      alert('Please enter search topic!');
      return;
    }

    onSubmit(topic.toString());
    e.currentTarget.reset(); // очищаємо поле після сабміту
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" />
      <button type="submit">Search</button>
    </form>
  );
}
