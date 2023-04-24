import React from 'react';
import './CartItem.css';

type CartItemProps = {
  name: string;
  amount: number;
  price: number;
  onRemove: () => void;
  onAdd: () => void;
};

const CartItem = ({name, onAdd, ...props} : CartItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className='cart-item'>
      <div>
        <h2>{name}</h2>
        <div className="summary">
          <span className="price">{price}</span>
          <span className="amount">x {props.amount}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={props.onRemove}>-</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
