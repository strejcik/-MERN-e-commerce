import React from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../store';
import redirect  from '../utils/redirect';





import UserLayout from '../layouts/UserLayout';
import UserLoggedInLayout from '../layouts/UserLoggedInLayout';
import AdminLoggedInLayout from '../layouts/AdminLoggedInLayout';


import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';


function routes(props) {
  function checkIfAuthedAndRedirect(props, history){
        const userLoggedIn = props.loggedIn;
        let userToken;
        try {
          userToken = JSON.parse(localStorage.getItem('user'));
        } catch(e) {
          localStorage.removeItem('user');
        }
        if(userLoggedIn && userToken) {
          history.push(redirect(JSON.stringify(userToken)));
        }
  }
  return (
    <ConnectedRouter history={history}>
        <React.Fragment>
        <Switch>
            <AdminRoute path="/dashboard" component={AdminLoggedInLayout} user={props.user}/>
            <PrivateRoute path="/auth" component={UserLoggedInLayout} user={props.user}/>
            <Route path="/" render={() => <UserLayout {...props} history={history} redirect={checkIfAuthedAndRedirect}/>}/>
        </Switch>
        </React.Fragment>
    </ConnectedRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps, {})(routes);