const validator = require('validator');
const _ = require('lodash');
const customMiddleware = {
    verifyToken: function(req,res,next) {
		const bearerHeader = req.headers['authorization'];
		if(typeof bearerHeader !== 'undefined') {
			const bearer = bearerHeader.split(' ');
			const bearerToken = bearer[1];

			req.token = bearerToken;
			next();
		} else {
			res.sendStatus(401);
		}
	},
    addProduct: function(req, res, next) {
    let errors = {};
    let requiredBodyKeys = ['name', 'ean', 'quantity', 'weight', 'price', 'description', 'category', 'image', 'currency', 'sku'];
    let requiredCategoryKeys = ['Mobile', 'TV', 'Computer', 'Camera'];
    let bodyValues = req.body;
    
    //Check for required body keys
    for(let i=0; i<requiredBodyKeys.length; i++) {
		if(!bodyValues.hasOwnProperty(requiredBodyKeys[i])) {
			errors.key='no key founded ' + requiredBodyKeys[i];
		}
	}
	//Check for required category keys
	for(let i=0; i<requiredCategoryKeys.length; i++) {
		if(!(requiredCategoryKeys.indexOf(bodyValues.category) > -1)) {
		  errors.category='no category founded';
		}
	  }
    //Check if form is filled
    let isFormFilled = Object.values(bodyValues).every(x => (x !== null && x !== '' && x!== false && x!==undefined));
    if(!isFormFilled) {
    	errors.form = 'Form is not filled properly';
    }
	/*=============== Add Product Validation Start ===================/*/
	function eanValidator(req) {
		console.log('Running ean ', req.body.ean);
			let ean = req.body.ean;
	        let isMatch = validator.matches(ean, '^[0-9]{12}$');
	        if(!isMatch) {
	            errors.ean = "Must contain 12 digits";
	        }
	        if(ean <= 0) {
	        	errors.ean = "Must be greater equal 0";
	        }
	}
	eanValidator(req);

	function weightValidator(req){
		let weight = req.body.weight;
		let isNumeric = validator.isNumeric(weight,{ no_symbols: true });
	    let isMatch = validator.matches(weight, '^([0-9]+([0-9]+)?)');
	    if(!isNumeric && !isMatch) {
	    	errors.weight = 'Must contain only digits and one coma';
	    }
	    if(weight <= 0) {
	    	errors.weight = "Must be greater equal 0";
	    }
	}
	weightValidator(req);

	function quantityValidator(req){
		let quantity = req.body.quantity;
		let isNumeric = validator.isNumeric(quantity);
		if(!isNumeric) {
	    	errors.quantity = 'Must contain only digits';
	    }
	    if(quantity <= 0) {
	    	errors.quantity = "Must be greater equal 0";
	    }
	}
	quantityValidator(req);

	function priceValidator(req){
		let price = req.body.price;
		let isNumeric = validator.isNumeric(price);
	    let isMatch = validator.matches(price, '^([0-9]+([0-9]+)?)');
	    if(!isNumeric && !isMatch) {
	    	errors.price = 'Must contain only digits and one coma'
	    }
	    if(price <= 0) {
	    	errors.price = "Must be greater equal 0";
	    }
	}
	priceValidator(req);

	function imageValidator(req) {
		let image = req.body.image;
		let imageWeight = 4*Math.ceil((image.length/3));
        if((imageWeight/1000) > 1024)
        {
            errors.image = 'File is heavier than 1MB'; 
        }
	}
	imageValidator(req);
	if(_.isEmpty(errors)) {
		return next();
	} else {
		res.json({"errors": errors});
	}

    }
}


module.exports = customMiddleware;