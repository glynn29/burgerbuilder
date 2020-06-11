import React from "react";
import Aux from "../../hoc/Auxillary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const IngredientPrices = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7,
};

class BurgerBuilder extends React.Component{
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    };

    purchaseHandler = () =>{
        this.setState({purchasing: true});
    };

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0})
    };

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = IngredientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = IngredientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () =>{
        alert("continue");
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} cancel={this.purchaseCancelHandler} continue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientsAdded={this.addIngredientsHandler}
                ingredientsRemoved={this.removeIngredientsHandler}
                purchasable={this.state.purchasable}
                disabled={disableInfo}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;
