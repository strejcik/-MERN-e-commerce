import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProductComponent from './ProductComponent';
import ReactLoading from 'react-loading';
import { productsFetchData } from '../actions/ProductsApiActions';
import { alertActions } from '../actions/alertActions';
import { setVisibilityFilter, addToCart, removeFromCart } from '../actions/productsActions';
import { cartPostData, cartDeleteData} from '../actions/ProductsApiActions';
import ProductFooterComponent from './ProductFooterComponent';
import '../styles/isLoading.css';

import { getVisibleProductsFilteredByKeyword } from '../selectors';
class ProductsListComponent extends Component {
  componentDidUpdate(prevProps) {
    const { products, productsFetchData, fetchUrl} = this.props;
    let currentObj = JSON.stringify(products);
    let nextObj = JSON.stringify(prevProps.products);
    if(currentObj !== nextObj) {
      productsFetchData(fetchUrl);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.priceFilter !== nextProps.priceFilter) {
      const { productsFetchData, fetchUrl} = this.props;
      productsFetchData(fetchUrl);
    }
  }
  componentDidMount() {
    const { productsFetchData, setVisibilityFilter, filterBy, fetchUrl} = this.props;
    setVisibilityFilter(filterBy);
    productsFetchData(fetchUrl);
    this.setState({Loading: false})
    //clear alert actions
    this.props.alertActions();
    //Prevent browser back button
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
      window.history.pushState(null, document.title,  window.location.href);
    });
  }
  renderProducts() {
    const { 
      filteredByKeyword, 
      addToCart,
      removeFromCart,
      cart,
      cartPostData,
      cartDeleteData,
      isFetchSuccess,
      isFetchLoading,
      lang
    } = this.props;
      return (
        
      <React.Fragment>
      	{isFetchSuccess &&
          filteredByKeyword.map((product, index) => 
          	<ProductComponent 
          		product={product} 
          		key={index} 
          		ProductFooterComponent={ProductFooterComponent} 
          		cart={cart} 
          		addToCart={(product) => addToCart(product, 1)} 
          		removeFromCart={() => removeFromCart(product)}
              cartPostData={cartPostData} 
              cartDeleteData={cartDeleteData}
              lang={lang}
              />)
      	}
        {
          isFetchLoading &&  <ReactLoading type={'cubes'} color={'#34495E'} height={'50%'} width={'50%'} />
        }
      </React.Fragment>
      )
  }
  render() {
    return (
		this.renderProducts()
    )
  }
}

const mapStateToProps = (state) => {
    return {
		    isFetchSuccess: state.productsFetchDataReducer.isSuccess,
        isFetchLoading: state.productsFetchDataReducer.isLoading,
        isFetchError: state.productsFetchDataReducer.fetchError,
        visibilityFilter: state.productsReducer.visibilityFilter,
        filteredByKeyword: getVisibleProductsFilteredByKeyword(state),
        priceFilter: state.productsReducer.priceFilter,
        lang: state.i18n.locale
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setVisibilityFilter: (filterName) => dispatch(setVisibilityFilter(filterName)),
      productsFetchData: (url) => dispatch(productsFetchData(url)),
      alertActions : () => dispatch(alertActions.clear()),
      addToCart : (product, product_quantity) => dispatch(addToCart(product, product_quantity)),
      removeFromCart: (product) => dispatch(removeFromCart(product)),
      cartPostData: (url, data) => dispatch(cartPostData(url, data)),
      cartDeleteData: (url, data) => dispatch(cartDeleteData(url, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListComponent);


