import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
const CheckoutSummary = (props) =>{
  return(
      <div className={classes.CheckoutSummary}>
          <h1>We hope is tastes good</h1>
          <div style={{width: '100%', margin:'auto'}}>
              <Burger ingredients={props.ingredients}/>
          </div>
          <Button btnType={"Danger"} clicked={}>Continue</Button>
          <Button btnType={"Success"} clicked={}>Cancel</Button>
      </div>
  );
};
export default CheckoutSummary;
