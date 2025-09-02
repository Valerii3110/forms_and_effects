// *Форма як компонент
//? На практиці форма – це окремий компонент, який відповідає лише за збір значень своїх полів. А те, що потрібно зробити з цими значеннями – наприклад, відправити замовлення чи зареєструвати користувача – передається у вигляді пропса ззовні.

//? У багатьох випадках форма не вирішує, що робити з даними – вона їх просто збирає.
//* Зробимо форму замовлення OrderForm, яка приймає пропс onSubmit, викликає його при сабміті, і передає туди дані.

// interface OrderFormProps {
//   onSubmit: (value: string) => void;
// }

//  function OrderForm({ onSubmit }: OrderFormProps) {
//   const handleSubmit = (formData: FormData) => {
//     const username = formData.get("username") as string;
//     onSubmit(username);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Place order</button>
//     </form>
//   );
// }

//?💡 Назва пропса (onSubmit, onOrder, onSend) може бути будь-якою – головне, щоб було зрозуміло, що він означає. Це ваш власний пропс, а не атрибут елемента form.

//* У компоненті App ми використовуємо OrderForm і передаємо в неї пропс onSubmit, який є функцією для обробки замовлення.
//* src/components/App.tsx

// import OrderForm from "./OrderForm";

// export default function App() {
//   const handleOrder = (data: string) => {
//     console.log("Order received from:", data);
//     // можна зберегти замовлення, викликати API, показати повідомлення тощо
//   };

//   return (
//     <>
//       <h1>Place your order</h1>
//       <OrderForm onSubmit={handleOrder} />
//     </>
//   );
// }

//! Що тут важливо:

//* - OrderForm не знає, що буде з даними – вона просто викликає onSubmit(data)
//* - Компонент форми не залежить від того, як саме обробляються дані – це зовнішня відповідальність.
//* - Код стає чистішим: форма не має логіки, яку вона не повинна знати.

interface OrderFormProps {
  onSubmit: (value: string) => void;
}

function OrderForm({ onSubmit }: OrderFormProps) {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    onSubmit(username);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Place order</button>
    </form>
  );
}

export default OrderForm;
