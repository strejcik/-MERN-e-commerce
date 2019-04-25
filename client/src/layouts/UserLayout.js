import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductsPage from '../pages/ProductsPage';
import MobilesPage from '../pages/MobilesPage';
import TvsPage from '../pages/TvsPage';
import ComputersPage from '../pages/ComputersPage'
import CamerasPage from '../pages/CamerasPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TermsPage from '../pages/TermsPage';


import UserNav from '../ui/UserNav';
import ShoppingCartPage from '../pages/ShoppingCartPage';

import HeaderComponent from '../components/HeaderComponent';


const UserLayout = ({ match, ...props}) => (
    <React.Fragment>
    	<HeaderComponent/>
	    <UserNav />
	      <Switch>
	        <Route exact path={`/`} component={ProductsPage} />
	        <Route path={`/mobiles`} component={MobilesPage} />
	        <Route path={`/tvs`} component={TvsPage} />
	        <Route path={`/computers`} component={ComputersPage} />
	        <Route path={`/cameras`} component={CamerasPage} />
 	        <Route path={`/login`} component={LoginPage} />
	        <Route path={`/register`} component={RegisterPage} />
					<Route path={`/shoppingcart`} component={ShoppingCartPage} />
					<Route path={`/terms`} component={TermsPage} />
	        {props.redirect(props.history)}
	      </Switch>
    </React.Fragment>
)

export default UserLayout