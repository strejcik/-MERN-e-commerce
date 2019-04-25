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

let initialState = {
	products:[],
	cart: [],
	visibilityFilter:'SHOW_ALL',
	keyword: '',
	priceFilter: 'ASC',
	currency: 'PLN',
	locale: 'pl',
	totals: 0,
	formattedTotals: 0,
}

export function productsReducer(state =initialState, action) {
	switch(action.type) {
		case ADD_PRODUCT:
			return addProduct(action.product, state);
			case REMOVE_PRODUCT:
		let products = state.filter((e) => e.id !== action.id );
			return {...state, products}
		case ADD_CART:
			let locale = action.cart.locale;
			let currency = action.cart.currency;
			if(locale === '' || currency === ''){
				return {...state, cart: action.cart.cart, totals: action.cart.totals, formattedTotals: action.cart.formattedTotals};
			} else {
				return {...state, cart: action.cart.cart, totals: action.cart.totals, formattedTotals: action.cart.formattedTotals, currency: currency, locale: locale}
			}
		case ADD_TO_CART:
			return addToCart(state.cart, action.product, action.product_quantity, state);
		case REMOVE_FROM_CART:
			return removeFromCart(state.cart, action.product, state);
		case REMOVE_ALL_FROM_CART:
			return removeAllFromCart(state);
		case SET_LOCALE_CART:
			switch(action.locale) {
				case 'pl':{
					return {...state, locale: action.locale, currency: 'PLN'};
				}
				case 'en':{
					return {...state, locale: action.locale, currency: 'USD'};
				}
				case 'fr':{
					return {...state, locale: action.locale, currency: 'EUR'};
				}
			}
		case SET_PRODUCT_FILTER:
			return {...state, visibilityFilter: action.filterName };
		case SET_PRICE_FILTER:
			return {...state, priceFilter: action.filterName};
		case SEARCH_PRODUCT_BY_KEYWORD:
			return {...state, keyword: action.keyword};
		default:
			return state;
	}
}


//add product

const addProduct = (products, state) => {
	switch(state.locale) {
		case 'pl':{
			const plItems = products.filter((e) => e.product_currency === 'PLN');
			const productItems = plItems.filter((e) => e.product_formattedPrice = new Intl.NumberFormat(state.locale, { style: 'currency', currency: e.product_currency }).format(e.product_price));
			return {...state, products:[...productItems], currency:'PLN', locale:'pl'}
		}
		case 'en':{
			const enItems = products.filter((e) => e.product_currency === 'USD');
			const productItems = enItems.filter((e) => e.product_formattedPrice = new Intl.NumberFormat(state.locale, { style: 'currency', currency: e.product_currency }).format(e.product_price));
			return {...state, products:[...productItems], currency:'USD', locale:'en'}
		}
		case 'fr':{
			const frItems = products.filter((e) => e.product_currency === 'EUR');
			const productItems = frItems.filter((e) => e.product_formattedPrice = new Intl.NumberFormat(state.locale, { style: 'currency', currency: e.product_currency }).format(e.product_price));
			return {...state, products:[...productItems], currency:'EUR', locale: 'fr'}
		}
		default:{
			const productItems = products.filter((e) => e.product_currency === 'PLN');
			return {...state, products:[...productItems], currency:'PLN', locale:'pl'}
		}
	}
}













const cartWithoutItem = (cart, product) => cart.filter(cartItem => cartItem._id !== product._id);

const itemInCart = (cart, product) => cart.filter(cartItem => cartItem._id === product._id)[0];


const addToCart = (cart, product, amount, state) => {
	const productQuantity = product.product_quantity;
	const productPrice = product.product_price;
	const productCurrency = product.product_currency;

    const cartItemQuantity = itemInCart(cart, product) === undefined? 0 : itemInCart(cart, product)["product_quantity"];
	const cartItem = itemInCart(cart, product);
	const cartTotals = productPrice * (cartItem === undefined? 1 : cartItem.product_quantity+1);
	
	const totals = state.totals + productPrice;
	
	const locale = state.locale;
	const currency = productCurrency;
	
	const formattedTotals = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(totals);
	const cartItemSubtotal = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(cartTotals);

	return cartItem === undefined
	    ? {...state, currency: productCurrency, formattedTotals: formattedTotals, totals: totals, cart: [...state.cart, { ...product, product_quantity: amount, product_formattedTotals:cartItemSubtotal}]}
	    : (cartItemQuantity < productQuantity?{...state, currency: productCurrency, formattedTotals: formattedTotals, totals: totals, cart: [...cartWithoutItem(cart, product), {...cartItem, product_quantity: cartItem.product_quantity + 1, product_formattedTotals:cartItemSubtotal}]}
	    : {...state})	
}

const removeFromCart = (cart, item, state) => {
	const productPrice = item.product_price;
	const productCurrency = item.product_currency;
	
	const cartItemQuantity = itemInCart(cart, item) === undefined? 0 : itemInCart(cart, item)["product_quantity"];
	const cartItem = itemInCart(cart, item);
	const cartTotals = productPrice * (cartItem === undefined? 1 : cartItem.product_quantity)-1;
	
	const totals = state.totals === 0 ? productPrice : (state.totals - productPrice);
	const locale = state.locale;
	
	const currency = productCurrency;
	const formattedTotals = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(totals);
	const cartItemSubtotal = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(cartTotals);

    return cartItem === undefined
    ? {...state}
    : (cartItemQuantity > 1
    ? {...state, formattedTotals: formattedTotals, totals: totals, cart:[...cartWithoutItem(cart, item), {...cartItem, product_quantity: cartItem.product_quantity - 1, product_formattedTotals:cartItemSubtotal}]}
    : {...state, formattedTotals: formattedTotals, totals: totals, cart:[...cartWithoutItem(cart, item)] });
}

const removeAllFromCart = (state) => {
    return {...state, formattedTotals: 0, totals: 0, cart: []};
}
