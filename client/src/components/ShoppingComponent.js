import React, { Component } from 'react'
import { connect } from 'react-redux';
import _ from 'lodash';
import { setVisibilityFilter, addToCart, removeFromCart, removeAllFromCart} from '../actions/productsActions';
import { productsFetchData, cartPostData, cartGetData, cartDeleteData, cartDeleteAllData} from '../actions/ProductsApiActions';
import { orderPostData } from '../actions/orderApiActions';
import PaypalComponent from './PayPalComponent';
import { history } from '../store';
import '../styles/ShoppingComponentStyle.css';
import { refreshToken } from '../actions/userActions';

let I18n = require('react-redux-i18n').I18n;

class ShoppingComponent extends Component {
    componentDidUpdate(prevProps) {
    	const { fetchUrl, productsFetchData} = this.props;
	    let currentProductsObj = JSON.stringify(this.props.products);
	    let prevProductsObj = JSON.stringify(prevProps.products);
	    
	    let currentVisibilityFilter = this.props.visibilityFilter;
	    let prevVisibilityFilter = prevProps.visibilityFilter;
   		 // Fetch data if prevObj and currObj are different
	   	if(currentProductsObj !== prevProductsObj) {
	         productsFetchData(fetchUrl);
	   	}
  		// Fetch data if visibility filter has changed
    	 if(currentVisibilityFilter !== prevVisibilityFilter) {
	 	    productsFetchData(fetchUrl);
    	 }
      }
  	componentDidMount() {
  		const { 
        fetchUrl, 
        visibilityFilter, 
        setVisibilityFilter, 
        productsFetchData, 
        cartGetData
      } = this.props;
	    setVisibilityFilter(visibilityFilter);
        productsFetchData(fetchUrl);
        cartGetData('/api/v1/cart');
    }
    onRefreshToken = () => {
        const { refreshToken } = this.props;
        refreshToken();
    }
    onContinue = () =>{
        history.push('/login');
        return window.Materialize.toast(I18n.t('application.shopping_continue_toast'), 4000);
    }
    render() {
        let { 
          loggedIn,
          formattedTotals,
          cart, 
          products, 
          addToCart, 
          removeFromCart,
          removeAllFromCart,
          cartPostData, 
          cartDeleteData,
          cartDeleteAllData,
          orderPostData,
          total,
          currency
        } = this.props;
        let cartIntersection = _.intersectionBy(cart, products, '_id');
        let productIntersection = _.intersectionBy(products, cart, '_id');
        cartIntersection = _.orderBy(cartIntersection, ['_id'],['asc']);
        return (
           <div className="container">
               <table className="highlight centered table-responsive cart-table">
                    <thead>
                      <tr>
                          <th></th>
                          <th>{I18n.t('application.shopping_name_header')}</th>
                          <th>{I18n.t('application.shopping_quantity_header')}</th>
                          <th>{I18n.t('application.shopping_price_header')}</th>
                          <th>{I18n.t('application.shopping_subtotal_header')}</th>
                      </tr>
                    </thead>
                     <tbody>
                         {cartIntersection.map((e, index) => {
                             return(
                                <tr key={e._id}>
                                    <td><img src={e.product_image} alt={e.product_name} style={{'width' : 100, 'height' : 100}}/></td>
                                    <td>{e.product_name}</td>
                                    <td>{e.product_quantity}</td>
                                    <td>{e.product_formattedPrice}</td>
                                    <td>{e.product_formattedTotals}
                                    </td>
                                    <td>
                                    	<a className="btn-floating btn-medium waves-effect waves-light green" onClick={() => {
	                                        addToCart(productIntersection[index]);
	                                        cartPostData('/api/v1/cart',productIntersection[index]);
                                        }}>
                                    		<i className="material-icons">add</i>
                                    	</a> 
                                    	<a className="btn-floating btn-medium waves-effect waves-light red" onClick={()=> {
	                                        removeFromCart(productIntersection[index]);
	                                        cartDeleteData('/api/v1/cart',productIntersection[index]);
                                        }}>
                                    		<i className="material-icons">remove</i>
                                    	</a> 
                                    </td>
                                </tr>
                             )
                         })}
                     </tbody>
                  </table>
                  <div className="totals-wrapper">
                  {cart.length>0 && <h5 className="total-item right">{I18n.t('application.shopping_totals_header')}: {formattedTotals}</h5>}
                  </div>
                  
                <div>
                {cart.length>0 && !loggedIn?
                    <button className="btn btn-medium waves-effect waves-light green right" onClick={this.onContinue}>
                    {I18n.t('application.shopping_continue_cart_btn')}
                            <i className="material-icons right">navigate_next</i>
                    </button> : null
                            
                            
                }
                {cart.length > 0 && loggedIn && <PaypalComponent 
                                                    cart={cart} 
                                                    orderPostData={orderPostData} 
                                                    total={total} 
                                                    currency={currency}
                                                    removeAllFromCart={removeAllFromCart}
                                                    refreshToken = {this.onRefreshToken}
                                                />
                }
                {
                    cart.length > 0 ?
                    <button className="btn btn-medium waves-effect waves-light red left" onClick={() =>{
                        removeAllFromCart();
                        cartDeleteAllData('/api/v1/cart/all');
                    }}>
                    {I18n.t('application.shopping_clear_cart_btn')}
                        <i className="material-icons left">remove_shopping_cart</i>
                    </button>: null
                }
                </div>
           </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.productsReducer.cart,
        products: state.productsReducer.products,
        visibilityFilter: state.productsReducer.visibilityFilter,
        formattedTotals: state.productsReducer.formattedTotals,
        loggedIn: state.authReducer.loggedIn,
        user: state.authReducer.user,
        lang: state.i18n.locale,
        total: state.productsReducer.totals,
        currency: state.productsReducer.currency,
    }
}

const mapDispatchToProps = dispatch => {
    return {
		addToCart: (product) => dispatch(addToCart(product)),
		removeFromCart: (product) => dispatch(removeFromCart(product)),
		setVisibilityFilter: (filterName) => dispatch(setVisibilityFilter(filterName)),
		productsFetchData: (url) => dispatch(productsFetchData(url)),
        cartGetData: (url) => dispatch(cartGetData(url)),
        cartPostData: (url, data) => dispatch(cartPostData(url, data)),
        cartDeleteData: (url, data) => dispatch(cartDeleteData(url, data)),
        cartDeleteAllData: (url) => dispatch(cartDeleteAllData(url)),
        removeAllFromCart: () => dispatch(removeAllFromCart()),
        orderPostData : (url, order) => dispatch(orderPostData(url, order)),
        refreshToken: (token) => dispatch(refreshToken(token)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingComponent);