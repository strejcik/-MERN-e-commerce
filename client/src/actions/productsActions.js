import { 
	ADD_PRODUCT, 
	REMOVE_PRODUCT, 
	SET_PRODUCT_FILTER, 
	SEARCH_PRODUCT_BY_KEYWORD, 
	SET_PRICE_FILTER,
	ADD_CART,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	REMOVE_ALL_FROM_CART,
	SET_LOCALE_CART
} from '../constants/productsConstants';

export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        product
    }
}

export function removeProduct(id) {
    return {
        type: REMOVE_PRODUCT,
        id
    }
}

export function addCart(cart) {
	return {
		type: ADD_CART,
		cart
	}
}

export function addToCart(product, product_quantity = 1) {
	return {
        type: ADD_TO_CART,
        product,
        product_quantity
    };
};

export function removeFromCart(product) {
	return {
		type: REMOVE_FROM_CART,
		product
	};
};

export function removeAllFromCart() {
	return {
		type: REMOVE_ALL_FROM_CART
	}
}

export function setLocaleCart(locale) {
	return {
		type: SET_LOCALE_CART,
		locale
	}
}


export function setVisibilityFilter(filterName) {
	return {
		type: SET_PRODUCT_FILTER,
		filterName
	}
}

export function searchProductByKeyword(keyword) {
	return {
		type: SEARCH_PRODUCT_BY_KEYWORD,
		keyword
	}
}

export function setPriceFilter(filterName) {
	return {
		type: SET_PRICE_FILTER,
		filterName
	}
}


