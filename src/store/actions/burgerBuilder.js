import * as actionTypes from './actionTypes';
import instance from "../../axios-orders";

export const addIngredient = (name) => {
  return{
      type: actionTypes.ADD_INGREDIENTS,
      ingredientName: name
  }
};

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) =>{
    return  {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
};

export const initIngredients = () =>{
  return dispatch => {
      instance.get('https://burger-builder-528f3.firebaseio.com/ingredients.json')
          .then(response =>{
             dispatch(setIngredients(response.data));
          })
          .catch(error => {
              dispatch(fetchIngredientsFailed());
          });
  }
};
