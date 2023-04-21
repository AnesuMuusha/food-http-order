import React from 'react';
import { useContext } from 'react';
import MealItemForm from './MealItemForm.tsx';
import  './MealItemOne.module.css';
import CartContext from '../../../store/cart-context.tsx';

interface MealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

const MealItem = (props:MealItemProps) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount:number) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: amount,
      price: props.price
    });
  };

  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className='description'>{props.description}</div>
        <div className='price'>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
