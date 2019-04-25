import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { i18nReducer } from 'react-redux-i18n';

import {
	productsFetchDataReducer,
	productPostDataReducer,
} from './ProductsApiReducer';

import {
	productsReducer
} from './productsReducer';

import { authReducer } from './authReducer';
import { alertReducer } from './alertReducer';
import { registrationReducer } from './registrationReducer';
import { captchaReducer } from './captchaReducer';
import { orderReducer } from './orderApiReducer';

export default (history) => combineReducers({
    productsFetchDataReducer,
	productPostDataReducer,
	productsReducer,
	authReducer,
	alertReducer,
	registrationReducer,
	captchaReducer,
	orderReducer,
	i18n: i18nReducer,
    router: connectRouter(history)
});