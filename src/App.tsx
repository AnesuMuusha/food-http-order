import React, { useState } from 'react';
import Header from './components/Layout/Header.tsx';
import Meals from './components/Meals/Meals.tsx';
import Cart from './components/Cart/Cart.tsx';
import CartProvider from './store/CartProvider.tsx';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
