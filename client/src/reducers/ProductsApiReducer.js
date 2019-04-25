import { 
	PRODUCTS_FETCH_DATA_SUCCESS,
	PRODUCTS_FETCH_DATA_LOADING,
	PRODUCTS_FETCH_DATA_ERROR,
	PRODUCT_POST_DATA_SUCCESS,
	PRODUCT_POST_DATA_LOADING,
	PRODUCT_POST_DATA_ERROR,
} from '../constants/productsApiConstants';


//===================================/


export function productsFetchDataReducer(state={
	isSuccess: false, 
	isLoading: false, 
	fetchError: false
}, action) {
	switch(action.type) {
		case PRODUCTS_FETCH_DATA_SUCCESS:
			return {...state, isSuccess: action.isSuccess}
		case PRODUCTS_FETCH_DATA_LOADING:
			return {...state, isLoading: action.isLoading}
		case PRODUCTS_FETCH_DATA_ERROR:
			return {...state, fetchError: action.fetchError}
		default: 
			return state;
	}
}

/*===============================*/


export function productPostDataReducer(
state={
	isSuccess: false, 
	isLoading: false, 
	postError: false
}, action) {
	switch(action.type) {
		case PRODUCT_POST_DATA_SUCCESS:
			return {...state, isSuccess: action.isSuccess}
		case PRODUCT_POST_DATA_LOADING:
			return {...state, isLoading: action.isLoading}
		case PRODUCT_POST_DATA_ERROR:
			return {...state, postError: action.postError}
		default:
			return state;
	}
}

