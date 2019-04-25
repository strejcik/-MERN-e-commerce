import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import {cartQuantityItems} from '../selectors';
import { Icon } from 'react-materialize';
import myFunction from '../utils/responsiveNav';
import classNames from 'classnames';
import '../styles/UserNavStyle.css';
let I18n = require('react-redux-i18n').I18n;

class UserNav extends Component {
	render() {
		const { cartQty } = this.props;
		const cartDigitClass = classNames({'cart-digit': cartQty});
		return (
			<div className="topnav" id="myTopnav">
				<Link exact to="/" activeClassName="active-link">{I18n.t('application.navbar_products_btn')}</Link>
				<Link to="/mobiles" activeClassName="active-link">{I18n.t('application.navbar_mobiles_btn')}</Link>
				<Link to="/tvs" activeClassName="active-link">{I18n.t('application.navbar_tvs_btn')}</Link>
				<Link to="/computers" activeClassName="active-link">{I18n.t('application.navbar_computers_btn')}</Link>
				<Link to="/cameras" activeClassName="active-link">{I18n.t('application.navbar_cameras_btn')}</Link>
				<Link to="/register" activeClassName="active-link">{I18n.t('application.navbar_register_btn')}</Link>
				<Link to="/login" activeClassName="active-link">{I18n.t('application.navbar_login_btn')}</Link>
				<Link to="/shoppingcart"><span className={cartDigitClass}>{cartQty}</span><Icon>shopping_cart</Icon></Link>
				<a href="javascript:void(0);" className="icon" onClick={() => myFunction()}>
					<i className="fa fa-bars"></i>
				</a>
		 </div>
		)
	}
}

const mapStateToProps = state => {
	return {
		lang: state.i18n.locale,
		cartQty: cartQuantityItems(state)
	}
}


export default connect(mapStateToProps, {})(UserNav);