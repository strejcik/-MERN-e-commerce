import { 
	
    PRODUCTS_FETCH_DATA_SUCCESS,
    PRODUCTS_FETCH_DATA_LOADING,
    PRODUCTS_FETCH_DATA_ERROR,
    
    PRODUCT_POST_DATA_SUCCESS,
    PRODUCT_POST_DATA_LOADING,
    PRODUCT_POST_DATA_ERROR,

    CART_POST_DATA_SUCCESS,
    CART_POST_DATA_LOADING,
    CART_POST_DATA_ERROR,

    CART_DELETE_DATA_SUCCESS,
    CART_DELETE_DATA_LOADING,
    CART_DELETE_DATA_ERROR,

    CART_GET_DATA_SUCCESS,
    CART_GET_DATA_LOADING,
    CART_GET_DATA_ERROR,
    
    CART_DELETE_ALL_DATA_SUCCESS,
    CART_DELETE_ALL_DATA_LOADING,
    CART_DELETE_ALL_DATA_ERROR,

} from '../constants/productsApiConstants';

import { addProduct, addCart } from './productsActions';
import productService from '../utils/productService';




//Get products actions
export function productsFetchDataSuccess(bool) {
    return {
        type: PRODUCTS_FETCH_DATA_SUCCESS,
        isSuccess: bool
    };
}

export function productsFetchDataLoading(bool) {
    return {
        type: PRODUCTS_FETCH_DATA_LOADING,
        isLoading: bool
    };
}

export function productsFetchDataError(bool) {
    return {
        type: PRODUCTS_FETCH_DATA_ERROR,
        fetchError: bool
    };
}

//Post product actions

export function productPostDataSuccess(bool) {
    return {
        type: PRODUCT_POST_DATA_SUCCESS,
        isSuccess: bool
    };
}

export function productPostDataLoading(bool) {
    return {
        type: PRODUCT_POST_DATA_LOADING,
        isLoading: bool
    };
}

export function productPostDataError(bool) {
    return {
        type: PRODUCT_POST_DATA_ERROR,
        postError: bool
    };
}

//Cart actions

//Get cart items

export function cartGetDataSuccess(bool) {
    return {
        type: CART_GET_DATA_SUCCESS,
        isSuccess: bool
    }
}

export function cartGetDataLoading(bool) {
    return {
        type: CART_GET_DATA_LOADING,
        isLoading: bool
    }
}

export function cartGetDataError(bool) {
    return {
        type: CART_GET_DATA_ERROR,
        postError: bool
    }
}

//Add item to cart
export function cartPostDataSuccess(bool) {
    return {
        type: CART_POST_DATA_SUCCESS,
        isSuccess: bool
    }
}

export function cartPostDataLoading(bool) {
    return {
        type: CART_POST_DATA_LOADING,
        isLoading: bool
    }
}

export function cartPostDataError(bool) {
    return {
        type: CART_POST_DATA_ERROR,
        postError: bool
    }
}

//Remove item from cart

export function cartDeleteDataSuccess(bool) {
    return {
        type: CART_DELETE_DATA_SUCCESS,
        isSuccess: bool
    }
}

export function cartDeleteDataLoading(bool) {
    return {
        type: CART_DELETE_DATA_LOADING,
        isLoading: bool
    }
}

export function cartDeleteDataError(bool) {
    return {
        type: CART_DELETE_DATA_ERROR,
        postError: bool
    }
}

//Remove all items from cart

export function cartDeleteAllDataSuccess(bool) {
    return {
        type: CART_DELETE_ALL_DATA_SUCCESS,
        isSuccess: bool,
    }
}

export function cartDeleteAllDataLoading(bool) {
    return {
        type: CART_DELETE_ALL_DATA_LOADING,
        isLoading: bool
    }
}

export function cartDeleteAllDataError(bool) {
    return {
        type: CART_DELETE_ALL_DATA_ERROR,
        postError: bool
    }
}



// =========== DB ACTIONS ============ //

//Fetch all products from db and add them to store
export function productsFetchData(url) {
    return dispatch => {
        dispatch(productsFetchDataLoading(true));
        dispatch(productsFetchDataSuccess(false));
        productService.fetchProducts(url)
            .then(
                products => {
                    dispatch(productsFetchDataSuccess(true));
                    dispatch(productsFetchDataLoading(false));
                    dispatch(addProduct(products));
                },
                error => {
                    dispatch(productsFetchDataError(true));
                    dispatch(productsFetchDataLoading(false));
                }
            )
    }
}

//Post product to db
export function productPostData(url, data) {
    return dispatch => {
        dispatch(productPostDataLoading(true));
        dispatch(productsFetchDataSuccess(false));
        productService.postProduct(url, data)
                .then(
                    response => {
                        dispatch(productPostDataSuccess(true));
                        dispatch(productPostDataLoading(false));
                    },
                    error => {
                        dispatch(productPostDataError(true));
                        dispatch(productPostDataLoading(false));
                    }
                )
    }   
}

//============== SESSION ACTIONS =================//


//Get cart, totals, formattedTotals from cart session
export function cartGetData(url) {
	return dispatch => {
			dispatch(cartGetDataLoading(true));
            dispatch(cartGetDataSuccess(false));
            productService.getCart(url)
                .then(
                	response =>{
                		dispatch(cartGetDataSuccess(true));
                        dispatch(cartGetDataLoading(false));
                        dispatch(addCart(response));
                	},
                	error => {
                		dispatch(cartGetDataError(true));
                        dispatch(cartGetDataLoading(false));
                	}
                )
	}
}

//Post cart item to cart session
export function cartPostData(url, product) {
    return dispatch => {
            dispatch(cartPostDataLoading(true));
            dispatch(cartPostDataSuccess(false));
            productService.addToCart(url, product)
                .then(
                    response => {
                        dispatch(cartPostDataSuccess(true));
                        dispatch(cartPostDataLoading(false));
                    },
                    error => {
                        dispatch(cartPostDataError(true));
                        dispatch(cartPostDataLoading(false));
                    }
                )
    }
}

//Delete cart item from cart session
export function cartDeleteData(url, product) {
    return dispatch => {
            dispatch(cartDeleteDataLoading(true));
            dispatch(cartDeleteDataSuccess(false));
            productService.removeFromCart(url, product)
                .then(
                    response => {
                        dispatch(cartDeleteDataSuccess(true));
                        dispatch(cartDeleteDataLoading(false));
                    },
                    error => {
                        dispatch(cartDeleteDataError(true));
                        dispatch(cartDeleteDataLoading(false));
                    }
                )
    }
}

//Delete cart from session

export function cartDeleteAllData(url) {
    return dispatch => {
        dispatch(cartDeleteAllDataLoading(true));
        dispatch(cartDeleteDataSuccess(false));
        productService.removeAllFromCart(url).then(
            response => {
                dispatch(cartDeleteDataSuccess(true));
                dispatch(cartDeleteAllDataLoading(false));
            },
            error => {
                dispatch(cartDeleteAllDataError(true));
                dispatch(cartDeleteAllDataLoading(false));
            }
        )
    }
}