import * as actionTypes from './actionTypes';
import instance from "../../axios-orders";
export const purchaseBurgerSuccess = (id, data) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data,
    }
};

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        instance.post('/orders.json',orderData)
            .then(res => {
                 dispatch(purchaseBurgerSuccess(res.data, orderData));
                }
            )
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};
