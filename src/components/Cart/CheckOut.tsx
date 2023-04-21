import React, { useRef, useState,FormEvent } from "react";
import "./CheckOut.css";

type FormValidity = {
  name: boolean;
  street: boolean;
  city: boolean;
  postalCode: boolean;
  }
  
  type CheckOutProps = {
  onConfirm: (data: {
  name: string,
  street: string,
  city: string,
  postalCode: string
  }) => void,
  onCancel: () => void
  }

const isEmpty = (value:string): boolean => value.trim() === '';
const isFiveChars = (value:string): boolean => value.trim().length===5;

const CheckOut =(props: CheckOutProps):JSX.Element => {
    const [formInputsValidity, setFormInputsValidity] = useState<FormValidity>({

        name:true,
        street:true,
        city:true,
        postalCode: true
    })
    const nameInputRef = useRef<HTMLInputElement>(null);
    const streetInputRef = useRef<HTMLInputElement>(null);
    const postalCodeInputRef = useRef<HTMLInputElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);

    const  confirmHandler = (event:FormEvent<HTMLFormElement>): void => {
event.preventDefault();
const eneteredName = nameInputRef.current!.value;
const eneteredStreet = streetInputRef.current!.value;
const eneteredPostalCode = postalCodeInputRef.current!.value;
const eneteredCity = cityInputRef.current!.value;

const eneteredNameIsVAlid = !isEmpty(eneteredName);
const eneteredStreetIsVAlid = !isEmpty(eneteredStreet);
const eneteredCityIsVAlid = !isEmpty(eneteredCity);
const eneteredPostalCodeIsVAlid = isFiveChars(eneteredPostalCode);

setFormInputsValidity({
    name:eneteredNameIsVAlid,
    street:eneteredStreetIsVAlid,
    city:eneteredCityIsVAlid,
    postalCode:eneteredCityIsVAlid
})

const formIsValid = 
eneteredNameIsVAlid &&
eneteredStreetIsVAlid &&
eneteredCityIsVAlid &&
eneteredPostalCodeIsVAlid;

if (formIsValid){
    return;
}
    props.onConfirm({
        name:eneteredName,
        street:eneteredStreet,
        city:eneteredCity,
        postalCode:eneteredPostalCode
    });
};
const nameControlClasses=`${'control'} ${formInputsValidity.name ?'': 'invalid'}`;
const streetControlClasses=`${'control'} ${formInputsValidity.street ?'': 'invalid'}`;
const postalCodeControlClasses=`${'control'} ${formInputsValidity.postalCode ?'': 'invalid'}`;
const cityControlClasses=`${'control'} ${formInputsValidity.city ?'': 'invalid'}`;
    return(
        <form className='form' onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef}/>
          {!formInputsValidity.street && <p>Please enter a valid Street!</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalCodeInputRef}/>
          {!formInputsValidity.postalCode && <p>Please enter a valid Postal Code!</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef}/>
          {!formInputsValidity.city && <p>Please enter a valid City!</p>}
        </div>
        <div className='actions'>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className='submit'>Confirm</button>
        </div>
      </form>
    )
}
export default CheckOut;