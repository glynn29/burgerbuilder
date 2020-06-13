import React from "react";
import Aux from "../../../hoc/Auxillary";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log()
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (<li key={igKey}>
                    <span>{igKey.toUpperCase()}: {this.props.ingredients[igKey]}</span>
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
                <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
