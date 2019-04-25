import {userConstants} from '../constants/userConstants';

export function captchaReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.CAPTCHA_REQUEST:
      return { loading: true, captcha: action.captcha };
    case userConstants.CAPTCHA_SUCCESS:
      return { loaded: true, captcha: action.captcha };
    case userConstants.CAPTCHA_FAILURE:
      return {};
    default:
      return state
  }
}