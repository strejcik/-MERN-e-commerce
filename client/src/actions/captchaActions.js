import * as captchaService from '../utils/captchaService';
import {alertActions} from './alertActions';
import {userConstants} from '../constants/userConstants';

export function verifyCaptcha(captcha) {
	function request(capt) { return { type: userConstants.CAPTCHA_REQUEST, capt } }
    function success(capt) { return { type: userConstants.CAPTCHA_SUCCESS, capt } }
    function failure(error) { return { type: userConstants.CAPTCHA_FAILURE, error } }

	return dispatch => {
		dispatch(request(captcha));
		captchaService.verify(captcha)
		.then(
			captcha => {
				dispatch(success(captcha));
				dispatch(alertActions.success('Captcha verified successfully.'));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		)
	}
}