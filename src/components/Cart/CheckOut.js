import React, { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().lenght ===5;

const CheckOut =props => {
    const [formInputsValidity, setFormInputsValidity] = useState({

        name:true,
        street:true,
        city:true,
        postalCode: true
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const  confirmHandler = (event)=>{
event.preventDefault();
const eneteredName = nameInputRef.current.value;
const eneteredStreet = streetInputRef.current.value;
const eneteredPostalCode = postalCodeInputRef.current.value;
const eneteredCity = cityInputRef.current.value;

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

if (!formIsValid){
    return;
}
    props.onConfirm({
        name:eneteredName,
        street:eneteredStreet,
        city:eneteredCity,
        postalCode:eneteredPostalCode
    });
};
const nameControlClasses=`${classes.control} ${formInputsValidity.name ?'': classes.invalid}`;
const streetControlClasses=`${classes.control} ${formInputsValidity.street ?'': classes.invalid}`;
const postalCodeControlClasses=`${classes.control} ${formInputsValidity.postalCode ?'': classes.invalid}`;
const cityControlClasses=`${classes.control} ${formInputsValidity.city ?'': classes.invalid}`;
    return(
        <form className={classes.form} onSubmit={confirmHandler}>
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
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    )
}
export default CheckOut;