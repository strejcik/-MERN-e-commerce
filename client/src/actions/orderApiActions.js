import { 
	
    ORDER_POST_DATA_SUCCESS,
    ORDER_POST_DATA_LOADING,
    ORDER_POST_DATA_ERROR,

} from '../constants/orderApiConstants';


import orderService from '../utils/orderService';
import { removeAllFromCart } from './productsActions';

export function orderPostDataSuccess(response) {
    return {
        type: ORDER_POST_DATA_SUCCESS,
        response
    };
}

export function orderPostDataLoading() {
    return {
        type: ORDER_POST_DATA_LOADING,
    };
}

export function orderPostDataError(error) {
    return {
        type: ORDER_POST_DATA_ERROR,
        payload: error
    };
}

export function orderPostData(url, order) {
    return dispatch => {
        dispatch(orderPostDataLoading());
        orderService.postOrder(url, order)
                .then(
                    response => {
                        dispatch(orderPostDataSuccess(response.success));
                        dispatch(removeAllFromCart());
                    },
                    error => {
                        dispatch(orderPostDataError(error));
                    }
                )
    }   
}