import React from 'react';
import HeaderCartButton from './HeaderCartButton.tsx';
import './Header.css';
const mealsImage = require('../../assets/meals.jpg');


interface HeaderProps {
  onShowCart: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <header className='header'>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className='main-image'>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </>
  );
};

export default Header;
