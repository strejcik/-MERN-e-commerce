import validator from 'validator';

//=============== Add Product Validation Start ===================//
export const eanValidator = (e) => {
        let isMatch = validator.matches(e, '^[0-9]{12}$');
        if(!isMatch) {
            return true;
        } else {
            return false;   
        }
}

export const weightValidator = (e) => {
	let isNumeric = validator.isNumeric(e,{ no_symbols: true });
    let isMatch = validator.matches(e, '^([0-9]+([0-9]+)?)');
    if(!isNumeric && !isMatch) {
    	return true;
    } else {
    	return false;
    }
}

export const quantityValidator = (e) => {
	let isNumeric = validator.isNumeric(e.target.value);
	if(!isNumeric) {
        e.target.value = null;
    	return true;
    } else {
    	return false;
    }
}

export const priceValidator = (e) => {
	let isNumeric = validator.isNumeric(e);
    let isMatch = validator.matches(e, '^([0-9]+([0-9]+)?)');
    if(!isNumeric && !isMatch) {
    	return true;
    } else {
    	return false;
    }
}

export const imageValidator = e => {
	let imageWeight = 4*Math.ceil((e.base64.length/3));
	//check if image is heavier than 1MB
	if((imageWeight/1000) > 1024) {
		return true;
	} else {
		return false;
	}
}

export const currencyValidator = e => {
	let currency = e;
	if(!(validator.isAlpha(currency, 'en-US') || validator.isAlpha(currency, 'pl-PL') || validator.isAlpha(currency, 'fr-FR'))) {
		return true;
	} else {
		return false;
	}
}

//=============== Add Product Validation End ===================//


//=============== Register Validation Start ===================//

export const userNameValidator = e => {
	let isUserNameEmpty = validator.isEmpty(e.target.value);
	let isUSerNameUndef = validator.equals(e.target.value, 'undefined');
	if(!isUserNameEmpty && !isUSerNameUndef) {
		return true;
	} else {
		return false;
	}
}

export const emailValidator = (e) => {
	let isEmail = validator.isEmail(e.target.value);
	let isEmailEmpty = validator.isEmpty(e.target.value);
	if(isEmail && !isEmailEmpty) {
		return true;
	} else {
		return false;
	}
}

export const passwordValidator = (passwordObj) => {
	let isPasswordEqual = validator.equals(passwordObj.password, passwordObj.confirmationPassword);
	let isPasswordEmpty = passwordObj.password === '';
	let isConfirmationEmpty = passwordObj.confirmationPassword === '';
	let isEmpty = Object.values(passwordObj).every(x => (x === null || x === ''));
	if(isEmpty) {
		return {
			isError: true,
			errors: {
				password: 'Password can not be empty',
				confirmationPassword: 'Confirmation can not be empty'
			}
		}
	}
	if(!isPasswordEqual) {
		return {
			isError: true,
			errors: {
				password: 'Password is not equal to Confirmation',
				confirmationPassword: 'Confirmation is not equal to Password'
			}
		}
	}
	if(isPasswordEmpty) {
		return {
			isError: true,
			errors: {
				password: 'Password can not be empty'
			}
		}
	}
	if(isConfirmationEmpty) {
		return {
			isError: true,
			errors: {
				confirmationPassword: 'Confirmation can not be empty'
			}
		}
	}
	return {
		isError: false,
		errors: {}
	}
}