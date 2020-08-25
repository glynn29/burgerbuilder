import React from "react";
import Aux from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";
const OrderSummary = props => {
        const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return (<li key={igKey}>
                    <span>{igKey.toUpperCase()}: {props.ingredients[igKey]}</span>
                </li>);
            });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>
                    A delicious burger with the following ingredients:
                </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
                <Button btnType="Success" clicked={props.continue}>Continue</Button>
            </Aux>
        );
};

export default OrderSummary;
