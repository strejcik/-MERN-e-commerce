import { 
	
    ORDER_POST_DATA_SUCCESS,
    ORDER_POST_DATA_LOADING,
    ORDER_POST_DATA_ERROR,

} from '../constants/orderApiConstants';
let initialState = {

}
export function orderReducer(state=initialState, action){
  switch (action.type) {
    case ORDER_POST_DATA_LOADING:
      return { ...state, isLoading: true };
    case ORDER_POST_DATA_SUCCESS:
      return { ...state, isLoading: false, response: action.response };
    case ORDER_POST_DATA_ERROR:
      return { ...state, isLoading: false, isError: true }
    default:
      return state;
  }
};