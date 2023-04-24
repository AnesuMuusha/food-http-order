import { FormEvent, RefObject, useRef, useState } from 'react';
import React from 'react';
import Input from '../../UI/Input.tsx';
import './MealItemForm.css';

interface MealItemFormProps {
  onAddToCart: (amount: number) => void;
  }

const MealItemForm= (props:MealItemFormProps) => {
  const [amountIsValid, setAmountIsValid] = useState<boolean>(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current!.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <div>
    <form className='formOne' onSubmit={submitHandler}>
     <div>
      <Input
        ref={amountInputRef as RefObject<HTMLInputElement>}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      </div>
      <div>
        <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
      </div>
    </form>
  
      </div>
  );
};

export default MealItemForm;
