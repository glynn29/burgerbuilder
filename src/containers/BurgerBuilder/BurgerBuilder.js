import React from "react";
import {connect} from 'react-redux';
import Aux from "../../hoc/Auxillary"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionType from "../../store/actions";



class BurgerBuilder extends React.Component{
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        instance.get('https://burger-builder-528f3.firebaseio.com/ingredients.json')
            .then(response =>{
                this.setState({ingredients: response.data});
            }).catch(error => this.setState({error: true}));
    }

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

        return  sum > 0;
    };

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {

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
        this.props.history.push('/checkout');
    };

    render() {
        const disableInfo = {
            ...this.props.ings
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>No ingredients were loaded</p>: <Spinner/>;

        if (this.props.ings){
            burger = (<Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientsAdded}
                        ingredientsRemoved={this.props.onIngredientsRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        disabled={disableInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}/>
                </Aux>);
            orderSummary = <OrderSummary totalPrice={this.props.price} ingredients={this.props.ings} cancel={this.purchaseCancelHandler} continue={this.purchaseContinueHandler}/>;

        }

        if (this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (igName) => dispatch({type: actionType.ADD_INGREDIENTS, ingredientName: igName}),
        onIngredientsRemoved: (igName) => dispatch({type: actionType.REMOVE_INGREDIENTS, ingredientName: igName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance));
