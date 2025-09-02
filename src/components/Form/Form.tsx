//* Створюємо просту форму з полем для вводу імені

// function Form() {
//   return (
//     <form>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

//* Обробка події відправки

//? Щоб обробити відправку форми, додаємо атрибут onSubmit і передаємо в нього функцію, яка отримає подію типу React.FormEvent<HTMLFormElement>.
// function Form(){
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

//* event.preventDefault() – блокує стандартну поведінку HTML-форми (перезавантаження сторінки).
//* event.currentTarget – це сама форма <form>, з якої можна зчитати всі значення.

//* Отримання значень через FormData

//* React не має власного API для роботи з формами, тому використовуємо FormData, як і в звичайному JavaScript.

function Form() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const username = formData.get('username');
    console.log('Username:', username);

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Enter username" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

//* FormData(form) – створює об'єкт, який містить усі значення полів форми.
//* formData.get("назва_поля") – отримує значення відповідного поля.
//* form.reset() – очищає форму після відправки.

//! FormData – це вбудований клас JavaScript, який дозволяє легко зчитувати значення полів форми.

//? Коли ви створюєте new FormData(form), браузер автоматично:

//* бере всі поля (<input>, <textarea>, <select>) з цієї форми;
//* зчитує їх імена (name="...") і значення;
//* зберігає їх у вигляді пари ключ-значення (name: value), як об'єкт.

//* FormData працює лише з тими елементами, які мають атрибут name. Без нього значення поля зчитано не буде.

export default Form;
