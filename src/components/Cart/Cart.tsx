import React from "react";
import { useContext, useState } from "react";
import Modal from "../UI/Modal.tsx";
import CartItem from "./CartItem.tsx";
import "./Cart.css";
import CartContext from "../../store/cart-context.tsx";
import CheckOut from "./CheckOut.tsx";
import { Item } from "../../store/cart-context.tsx";

interface CartProps {
  onClose: () => void;
}

const Cart = (props: CartProps) => {
  const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Type inference
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const cart: {
    items: Item[];
    totalAmount: number;
    addItem: Function;
    removeItem: Function;
    clearCart: Function;
  } = useContext(CartContext);

  const totalAmount: string = `$${cart.totalAmount.toFixed(2)}`;
  const hasItems: boolean = cart.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cart.removeItem(id);
  };

  const cartItemAddHandler = (item: Item) => {
    cart.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };
  const submitOrderHandler = async (userData: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
  }) => {
    setIsSubmitting(true);
    await fetch(
      "https://meals-d9a2f-default-rtdb.firebaseio.com/New-orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cart.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cart.clearCart();
  };
  const cartItems = (
    <ul className="cart-items">
      {cart.items.map((item: Item) => {
        const { id, name, quantity, price } = item; // Object destructuring
        return (
          <CartItem
            key={id}
            name={name}
            amount={quantity}
            price={price}
            onRemove={cartItemRemoveHandler.bind(null, id)}
            onAdd={() => {
              cartItemAddHandler(item);
            }}
          />
        );
      })}
    </ul>
  );
  const modalActions = (
    <div className="actions">
      <button className="button--alt" onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className="actions">
        <button className="button" onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
