const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid/v4');
const config = require('../config/locale');
const intlCurrency = require('intl-currency');

let Product = new Schema({
    product_name: {
    	type: String,
    },
    product_ean: {
    	type: Number
    },
    product_quantity: {
    	type: Number
    },
    product_weight: {
    	type: Number
    },
    product_price: {
    	type: Number
    },
    product_formattedPrice: {
        type: String,
    },
    product_currency: {
        type: String,
    },
    product_sku: {
        type: Number,
    },
    product_description: {
    	type: String
    },
    product_category: {
        type: String
    },
    product_image: {
        type: String
    },
    product_formattedTotals:{
        type: String
    }
});

Product.pre('save', function(next) {
    switch(this.product_currency) {
		case 'USD' : {
            let en = "en";
            this.product_formattedPrice = intlCurrency(this.product_price, {
                currency: this.product_currency,
                locales: en
            });
        }
		case 'PLN': {
            let pl = "pl";
            this.product_formattedPrice = intlCurrency(this.product_price, {
                currency: this.product_currency,
                locales: pl
            });
        }
		case 'EUR': {     
            let fr = "fr";
            this.product_formattedPrice = intlCurrency(this.product_price, {
                currency: this.product_currency,
                locales: fr
            });
        }
	}
    next();
});

  

module.exports = mongoose.model('Product', Product);
