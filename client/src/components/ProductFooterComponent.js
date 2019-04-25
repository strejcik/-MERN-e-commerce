import React, { Component } from 'react'
import {Modal} from 'react-materialize';
import { ToastContainer, toast, Zoom} from 'react-toastify';
import classNames from 'classnames';
import '../styles/ToastStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ProductFooterComponentStyle.css';
let I18n = require('react-redux-i18n').I18n;

class ProductFooterComponent extends Component {
  notify = () => {
    const toastifyStyles = classNames('add-to-cart-toast');
    let str= '+';
    toast(str, {
      toastId: 12,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_RIGHT,
      draggable: false,
      closeButton: false,
      hideProgressBar: true,
      className: toastifyStyles
    });
  }
  render() {
    const { 
      product, 
      addToCart, 
      removeFromCart, 
      cartPostData, 
      cartDeleteData,
       } = this.props;
    return (
      <React.Fragment>
      <div>
      	<button className="waves-effect waves-light btn green add-to-cart-btn" onClick={() =>{
          this.notify();
          addToCart(product, 1);
          cartPostData('/api/v1/cart',product);
        }}><i className="material-icons left">add_shopping_cart</i>{I18n.t('application.product_add_to_cart_btn')}</button>
      </div>
      <ToastContainer 
      pauseOnFocusLoss={false} 
      autoClose={2000}
      transition={Zoom}
      toastClassName='toast'
      />
      <div>
        <button className="waves-effect waves-light btn red remove-from-cart-btn" onClick={() =>{
          removeFromCart(product);
          cartDeleteData('/api/v1/cart',product);
        }}><i className="material-icons left">remove_shopping_cart</i>{I18n.t('application.product_remove_from_cart_btn')}</button>
      </div>
      <Modal
        header='//TODO'
        trigger={<button className="waves-effect waves-light btn blue info-btn" href="#modal1"><i className="material-icons left">info_outline</i>{I18n.t('application.product_info_cart_btn')}</button>}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.</p>
      </Modal>
    </React.Fragment>
    )
  }
}

export default (ProductFooterComponent);