import React from 'react';
import {Col} from 'react-materialize';
import '../styles/ProductComponentStyle.css';
import SmoothImage from 'react-smooth-image';
let I18n = require('react-redux-i18n').I18n;

const ProductComponent = (props) => {
	const {
		product_name, product_quantity, 
		product_image, product_formattedPrice} = props.product;
	const { 
		ProductFooterComponent, product, 
		cart, addToCart, 
		removeFromCart, cartPostData, cartDeleteData, 
		lang} = props;
  return (
	<Col m={6} s={12} l={4}>
		<div className="card blue-grey darken-1 product-wrapper">
			<div className="card-content white-text">
			  <span className="card-title">
			  	<span className="new badge qty-badge" data-badge-caption={product_quantity}>{I18n.t('application.product_stock_qty')}:</span>
			  	<p>{product_name}</p>
			  </span>
			  <div className="card-body" >

			<SmoothImage
	         src={product_image}
	         alt="product_image"
	         transitionTime={2.0}
	      	/>
			  </div>
			  <div className="price-wrapper">
				<div className="price-content">
					<span className="product-price">{product_formattedPrice}</span>
				</div>
			  </div>
			</div>
			<div className="card-action">
				<ProductFooterComponent 
					product={product}
					cart={cart}
					addToCart={addToCart}
					removeFromCart={removeFromCart} 
					cartPostData={cartPostData} 
					cartDeleteData={cartDeleteData}
					lang={lang}
				/>
			</div>
		</div>
	</Col>
  )
}

export default ProductComponent;
