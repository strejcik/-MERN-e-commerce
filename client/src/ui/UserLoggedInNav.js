import React, { Component } from 'react'
import { connect } from 'react-redux';
import classNames from 'classnames';
import {cartQuantityItems} from '../selectors';
import { logout } from '../actions/userActions';
import { NavLink as Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import myFunction from '../utils/responsiveNav';
let I18n = require('react-redux-i18n').I18n;

class UserLoggedInNav extends Component {
  render() {
    const { match, logout, cartQty} = this.props; 
    const cartDigitClass = classNames({'cart-digit': cartQty});
    return (
      <div className="topnav" id="myTopnav">
        <Link exact to={`${match.path}`} activeClassName="active-link">{I18n.t('application.navbar_products_btn')}</Link>
        <Link to={`${match.path}/mobiles`} activeClassName="active-link">{I18n.t('application.navbar_mobiles_btn')}</Link>
        <Link to={`${match.path}/tvs`} activeClassName="active-link">{I18n.t('application.navbar_tvs_btn')}</Link>
        <Link to={`${match.path}/computers`} activeClassName="active-link">{I18n.t('application.navbar_computers_btn')}</Link>
        <Link to={`${match.path}/cameras`} activeClassName="active-link">{I18n.t('application.navbar_cameras_btn')}</Link>
        <Link to={`${match.path}/logout`} activeClassName="active-link" onClick={() => logout()}>{I18n.t('application.navbar_logout_btn')}</Link>
        <Link to={`${match.path}/orders`} activeClassName="active-link">{I18n.t('application.navbar_orders_btn')}</Link>
        <Link to={`${match.path}/shoppingcart`}><span className={cartDigitClass}>{cartQty}</span><Icon>shopping_cart</Icon></Link>
        <a href="javascript:void(0);" className="icon" onClick={() => myFunction()}>
					<i className="fa fa-bars"></i>
				</a>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()) 
  }
}

const mapStateToProps = state => {
  return {
    lang: state.i18n.locale,
    cartQty: cartQuantityItems(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoggedInNav);

