import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVisibleProducts, getVisibleProductsFilteredByKeyword, getProductsByPrice} from '../../selectors';
import { searchProductByKeyword, setPriceFilter} from '../../actions/productsActions';
let I18n = require('react-redux-i18n').I18n;

class FilterComponent extends Component {
  state = {
    filterByKeyword: '',
    selectedOption: ''
  }
  componentDidMount() {
    const { priceFilter, searchProductByKeyword } = this.props;
    searchProductByKeyword('');
    this.setState({
      selectedOption: priceFilter
    });
  }
  onChangeSearch = (e) => {
  const { searchProductByKeyword } = this.props;
    searchProductByKeyword(e.target.value);
  }
handleCheck = (e) => {
  const { setPriceFilter } = this.props;
  this.setState({
    selectedOption: e.target.value
  });
  setPriceFilter(e.target.value);
}

render() {
  const { keyword} = this.props;
    return (
    <form>
        <div className="input-field col">
          <input 
            id="search" 
            className="validate"
            type="text"
            name="filterByKeyword"
            value={keyword}
            onChange={e => this.onChangeSearch(e)}
          />
          <label htmlFor="search">{I18n.t('application.search_product_label')}</label>
        </div>
        <div className="input-field col s12 m12 l12">
          <input type="radio" id={"ASC"} onChange={this.handleCheck} value={"ASC"} checked={this.state.selectedOption === 'ASC'}/>
          <label htmlFor="ASC">{I18n.t('application.search_product_asc')}</label>
        </div>
        <div className="input-field col s12 m12 l12">
          <input type="radio" id={"DESC"} onChange={this.handleCheck} value={"DESC"} checked={this.state.selectedOption === 'DESC'}/>
          <label htmlFor="DESC">{I18n.t('application.search_product_desc')}</label>
        </div>
    </form>    
    )
  }
}



const mapStateToProps = (state) => {
  return {
    products: getVisibleProducts(state),
    filteredByKeyword: getVisibleProductsFilteredByKeyword(state),
    getProductsByPrice: getProductsByPrice(state),
    priceFilter: state.productsReducer.priceFilter,
    keyword: state.productsReducer.keyword,
    lang: state.i18n.locale
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchProductByKeyword: (keyword) => dispatch(searchProductByKeyword(keyword)),
    setPriceFilter: (filterName) => dispatch(setPriceFilter(filterName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent); 