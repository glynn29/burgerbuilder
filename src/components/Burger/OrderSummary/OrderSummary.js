import React from "react";
import Aux from "../../../hoc/Auxillary";
const orderSummary = (props) => {
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
        </Aux>
    );

};

export default orderSummary;
