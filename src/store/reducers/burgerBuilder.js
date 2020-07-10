import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const IngredientPrices = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7,
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + IngredientPrices[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedStates = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + IngredientPrices[action.ingredientName]
    };
    return updateObject(state, updatedStates);
};

const setIngredient = (state, action) => {
    return updateObject(state , {ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false});
};

const fetchIngredientFailed = (state, action) =>{
    return updateObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAIL:
           return fetchIngredientFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
