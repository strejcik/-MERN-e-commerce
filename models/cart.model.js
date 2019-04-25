const config = require('../config/locale');
const intlCurrency = require('intl-currency');

class Cart {
   constructor() {
        this.data = {};
        this.data.items = [];
        this.data.totals = 0;
		this.data.currency = '';
		this.data.locale = '';
		this.data.formattedTotals = '';
   }
   getAllItems(request) {
   		let cartData = {
			cart: this.data.items,
			totals: this.data.totals,
			currency: this.data.currency,
			locale: this.data.locale,
			formattedTotals: this.data.formattedTotals,
   		}
   		return cartData;
   }
   inCart(productID = 0) {
	    let found = false;
	    this.data.items.forEach(item => {
	       let itemId = JSON.stringify(item._id);
	       let productId = JSON.stringify(productID);
	       if(itemId === productId) {
	           found = true;
	       }
	    });
	    return found;
	}
	calculateTotals() {
	    this.data.totals = 0;
	    this.data.items.forEach(item => {
	        let price = item.product_price;
	        let qty = item.product_quantity;
	        let amount = price * qty;

			this.data.totals += amount;
	    });
	    this.setFormattedTotals();
	}

	setFormattedTotals() {
		let totals = this.data.totals;
		this.data.formattedTotals = intlCurrency(totals, {
			currency: this.data.currency,
			locales: this.data.locale
		});
	}
	addToCart(product = null, quantity = 1) {
	    if(!this.inCart(product._id)) {
	        let prod = {
	          _id: product._id,
	          product_name: product.product_name,
	          product_description: product.product_description,
	          product_price: product.product_price,
	          product_category: product.product_category,
	          product_ean: product.product_ean,
	          product_quantity: quantity,
	          product_image: product.product_image,
			  product_currency: product.product_currency,
			  product_sku: product.product_sku,
			  product_formattedPrice: config.formattedPrice(product).formattedPrice,
			  product_formattedTotals: config.formattedPrice(product).formattedTotals
			};
			this.data.items.push(prod);
			this.data.currency = prod.product_currency;
			this.data.locale =  config.formattedPrice(prod).locale;
			this.calculateTotals();
		
		} else {
	        let cartItem = this.data.items.filter((cartItem) => JSON.stringify(cartItem._id) === JSON.stringify(product._id))[0];
	    	if(cartItem.product_quantity < product.product_quantity) {
		        cartItem.product_quantity++;
				cartItem.product_formattedPrice = config.formattedPrice(product).formattedPrice;
				cartItem.product_formattedTotals = config.formattedPrice(product, cartItem.product_quantity).formattedTotals;
				this.data.items.filter((cartItem) => JSON.stringify(cartItem._id) !== JSON.stringify(product._id)).push(cartItem);
		        this.calculateTotals();
			}
		}
    }
    saveCart(request) {
	    if(request.session) {
	        request.session.cart = this.data;
	    }
	}
	removeFromCart(product, qty = 1, req) {
	    let cartItem = this.data.items.filter((item) => JSON.stringify(product._id) === JSON.stringify(item._id))[0];
		let cartItems = this.data.items.length;
		if(!cartItem) return;
		if(cartItem) {
			if(cartItem && cartItem.product_quantity > 1) {
				cartItem.product_quantity--;
				cartItem.product_formattedTotals = config.formattedPrice(product, cartItem.product_quantity).formattedTotals;
				this.calculateTotals();
			} else {
				this.data.items = this.data.items.filter((item) => JSON.stringify(item._id) !== JSON.stringify(product._id));
				this.calculateTotals();
			}
		}
		if(!cartItems) {
			this.emptyCart(req);
		}

	}
	emptyCart(request) {
	    this.data.items = [];
	    this.data.totals = 0;
		this.data.formattedTotals = '';
		this.data.currency = '';
		this.data.locale = '';
	    if(request.session) {
	        request.session.cart.items= [];
	        request.session.cart.totals = 0;
	        request.session.cart.formattedTotals = '';
			request.session.cart.currency = '';
			request.session.cart.locale = '';
		}
	}
	isEmpty(request) {
		if(!request.session) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = new Cart();

