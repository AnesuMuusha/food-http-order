import React from "react";
import classes from "./CheckOut.module.css";

const CheckOut =props => {
const  confirmHandler = (event)=>{
event.preventDefault();
};

    return(
       <form onSubmit={confirmHandler}>
       <div className={classes.control}>
           <label htmlFor="name">Your Name</label>
           <input type="text" id="name"/>
       </div>
     
       <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street"/>
        </div>
        <div className={classes.control}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal"/>
        <div className={classes.control}>
            <label htmlFor="city">city</label>
            <input type="text" id="city"/>
        </div>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
     
        </div>
     
      </form>
    )
}
export default CheckOut;