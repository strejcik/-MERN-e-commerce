import { history } from '../store';
import * as userService from '../utils/userService';

import {userConstants} from '../constants/userConstants';
import {alertActions} from './alertActions';

export function register(user) {
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user.user));
                    history.push(user.redirectLocation);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export function refreshToken() {
    return dispatch => {
        let user = JSON.parse(localStorage.getItem('user'));
        
        let token = user ? user : undefined;
        dispatch({
            type: 'ON_INIT',
            token
        })
    }
}

export function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
