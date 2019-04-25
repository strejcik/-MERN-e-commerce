import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import { NavLink as Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import myFunction from '../utils/responsiveNav';
let I18n = require('react-redux-i18n').I18n;

function AdminLoggedInNav({match, logout}) {
	return (
		<div className="topnav" id="myTopnav">
		  <Link exact to={`${match.path}`} activeClassName="active-link">{I18n.t('application.navbar_add_product_btn')}</Link>
		  <Link to="/login" activeClassName="active-link" onClick={() => logout()}>{I18n.t('application.navbar_logout_btn')}</Link>
		  <a href="javascript:void(0);" className="icon" onClick={() => myFunction()}>
		    <i className="fa fa-bars"></i>
		  </a>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		lang: state.i18n.locale,
	}
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoggedInNav);

