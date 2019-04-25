import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductsPage from '../pages/ProductsPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import MobilesPage from '../pages/MobilesPage';
import TvsPage from '../pages/TvsPage';
import ComputersPage from '../pages/ComputersPage';
import CamerasPage from '../pages/CamerasPage';
import OrdersPage from '../pages/OrdersPage';

import UserLoggedInNav from '../ui/UserLoggedInNav';

import HeaderComponent from '../components/HeaderComponent';

const UserLoggedInLayout = ({ match, ...props}) => (
    <React.Fragment>
    	<HeaderComponent/>
	    <UserLoggedInNav match={match}/>
	      <Switch>
			<Route path={`${match.url}/orders`} component={OrdersPage}/>
			<Route path={`${match.url}/shoppingcart`} component={ShoppingCartPage}/>
			<Route path={`${match.url}/mobiles`} component={MobilesPage} />
			<Route path={`${match.url}/tvs`} component={TvsPage} />
			<Route path={`${match.url}/computers`}  component={ComputersPage} />
			<Route path={`${match.url}/cameras`} component={CamerasPage} />
	    <Route path={`${match.url}`} component={ProductsPage} />
	      </Switch>
    </React.Fragment>
)

export default UserLoggedInLayout;