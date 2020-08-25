import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';

import instance from "../../axios-orders";
import Aux from "../../hoc/Auxillary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const  BurgerBuilder = props =>{

    const [purchasing, setPurchasing] = useState(false);

    const {onInitIngredients} = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    // addIngredientsHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = IngredientPrices[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };
    //
    // removeIngredientsHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = IngredientPrices[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };

    const purchaseHandler = () => {
        if (props.isAuthenticated){
           setPurchasing(true);
        } else{
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return  sum > 0;
    };

    const purchaseCancelHandler = () =>{
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        //
        // const queryString = queryParams.join('&');
        //
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString,
        // });
        props.history.push('/checkout');
    };
        const disableInfo = {
            ...props.ings
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = props.error ? <p>No ingredients were loaded</p>: <Spinner/>;

        if (props.ings){
            burger = (<Aux>
                    <Burger ingredients={props.ings}/>
                    <BuildControls
                        ingredientsAdded={props.onIngredientsAdded}
                        ingredientsRemoved={props.onIngredientsRemoved}
                        purchasable={updatePurchaseState(props.ings)}
                        disabled={disableInfo}
                        price={props.price}
                        ordered={purchaseHandler}
                        isAuth={props.isAuthenticated}
                    />
                </Aux>);
            orderSummary = <OrderSummary
                totalPrice={props.price}
                ingredients={props.ings}
                cancel={purchaseCancelHandler}
                continue={purchaseContinueHandler}/>;

        }

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

}
const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientsRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance));
