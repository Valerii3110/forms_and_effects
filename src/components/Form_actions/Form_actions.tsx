//? Кожен раз при відправці форми ми пишемо один і той самий шаблонний код:

//* Блокуємо стандартну поведінку браузера (event.preventDefault())
//* Створюємо об’єкт FormData, щоб дістати значення полів
//* Опрацьовуємо дані
//* Скидаємо форму (form.reset())

//? Це рутинний код, який можна автоматизувати завдяки Form Actions – спеціального способу обробки форм, який надає React.

//? Коли ви передаєте функцію в атрибут action форми, React автоматично викликає цю функцію після сабміту, передаючи їй знайому нам FormData – об'єкт, що містить усі значення полів форми.

// function FormActions() {
//   const handleSubmit = (formData: FormData) => {
//     console.log('Form submitted');
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

//? В такому випадку React:

//* - перехоплює і зупиняє подію submit
//* - формує об’єкт FormData
//* - викликає функцію handleSubmit(formData)
//* - formData – це не подія. Це об’єкт із готовими значеннями полів.

//! 💡 Тип FormData – вбудований, тому нічого додатково імпортувати не треба.

//? Для отримання значень використовуємо метод formData.get("назва_поля"):

// function FormActions() {
//   const handleSubmit = (formData: FormData) => {
//     const username = formData.get('username') as string;
//     console.log('Name:', username);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

//! 🧠 formData.get() повертає значення типу FormDataEntryValue | null. У текстових полях це зазвичай рядок, але TypeScript цього не знає. Тому треба явно вказати тип значення за допомогою as тип.

//* Попереднє заповнення форм

//? Іноді потрібно, щоб поля у формі вже мали якісь значення – наприклад, при редагуванні профілю або коли дані приходять з бекенду.

//? Коли потрібно, щоб поле у формі було вже заповнене при відкритті, в React використовують атрибут defaultValue. Він задає початкове значення інпута або текстової області.

//* Це зручно, наприклад:

//* - у формі редагування профілю
//* - для тестових демо з готовими даними
//* - при поверненні до попередньої форми

//? Для цього в React використовують атрибут defaultValue. Це аналог HTML-атрибута value, але лише для початкового значення, яке користувач може змінити перед сабмітом форми.

function FormActions() {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    console.log('Name:', username);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" defaultValue="John Doe" />
      <button type="submit">Submit</button>
    </form>
  );
}

//! 🧠 Значення defaultValue відображаються у полях одразу, але користувач може їх змінити перед відправкою. Після сабміту ці значення потрапляють у FormData.
export default FormActions;
