import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AddProductPage from '../pages/AddProductPage';
import ProductsPage from '../pages/ProductsPage';

import AdminLoggedInNav from '../ui/AdminLoggedInNav';

import HeaderComponent from '../components/HeaderComponent';

const AdminLoggedInLayout = ({ match, ...props}) => (
    <React.Fragment>
    	<HeaderComponent/>
	    <AdminLoggedInNav match={match}/>
	      <Switch>
				<Route path={`${match.url}/ProductsPage`} component={ProductsPage}/>
	            <Route path={`${match.url}`} component={AddProductPage} />
				<Redirect to={`${match.url}`}/>
	      </Switch>
    </React.Fragment>
)

export default AdminLoggedInLayout;