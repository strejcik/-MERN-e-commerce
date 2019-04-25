const intlCurrency = require('intl-currency');
function formattedPrice(product, quantity = 1) {
	switch(product.product_currency) {
			case 'USD' : {
				let en = "en";
				let formattedPrice = intlCurrency(product.product_price, {
					currency: product.product_currency,
					locales: en
				});
				let totals = product.product_price * quantity;
				let formattedTotals = intlCurrency(totals, {
					currency: product.product_currency,
					locales: en
				}); 
				return {
					formattedPrice,
					formattedTotals,
					locale: en
				}
			}
			case 'PLN': {
				let pl = "pl";
				let formattedPrice = intlCurrency(product.product_price, {
					currency: product.product_currency,
					locales: pl
				});
				let totals = product.product_price * quantity;
				let formattedTotals = intlCurrency(totals, {
					currency: product.product_currency,
					locales: pl
				}); 
				return {
					formattedPrice,
					formattedTotals,
					locale: pl
				}
			}
			case 'EUR': {
				let fr = "fr";
				let formattedPrice = intlCurrency(product.product_price, {
					currency: product.product_currency,
					locales: fr
				});
				let totals = product.product_price * quantity;
				let formattedTotals = intlCurrency(totals, {
					currency: product.product_currency,
					locales: fr
				}); 
				return {
					formattedPrice,
					formattedTotals,
					locale: fr
				}
			}
		}
};


module.exports.formattedPrice = formattedPrice;

