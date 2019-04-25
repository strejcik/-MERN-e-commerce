import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AdminRoute = ({ component: Component, ...rest }) => {
    function checkIfAuthed(){
        if(!rest.user) {
            return false; 
         }
         let userToken;
         let userTokenExpTime;
         let userTokenType;
         try {
            userToken = localStorage.getItem('user');
            userTokenExpTime = jwt_decode(JSON.stringify(userToken)).exp;
            userTokenType = jwt_decode(JSON.stringify(userToken)).account_type;
         } catch(e) {
             localStorage.removeItem('user');
         }
         

         const currentTime = Date.now() / 1000;
         if (userTokenExpTime < currentTime) {
             localStorage.removeItem('user');
             window.location.reload();    
        }
         if(userTokenType === 'admin') {
             return true;
         } else {
             localStorage.removeItem('user');
         }
    }
    return (
        <Route {...rest} render={props => (
            checkIfAuthed()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
    )
};

export default AdminRoute;
