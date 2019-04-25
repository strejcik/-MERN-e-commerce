import { createSelector } from 'reselect';


const getVisibilityFilter = (state) => state.productsReducer.visibilityFilter
export const getProducts = (state) => state.productsReducer.products;



const getKeyword = (state) => state.productsReducer.keyword;
const getPriceFilter = (state) => state.productsReducer.priceFilter;


export const cartQuantityItems = (state) => {
  if(state.productsReducer.cart.length === 0) {
    return ;
  }
  return state.productsReducer.cart.length;
};





export const getVisibleProducts = createSelector(
  [ getVisibilityFilter, getProducts ],
  (visibilityFilter, products) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return products
      case 'SHOW_MOBILES':
        return products.filter(e => e.product_category === 'Mobile');
      case 'SHOW_TVS':
        return products.filter(e => e.product_category === 'TV');
      case 'SHOW_COMPUTERS':
      	return products.filter(e => e.product_category === "Computer");
      case 'SHOW_CAMERAS':
        return products.filter(e => e.product_category === 'Camera');
      default:
        return products;
    }
  }
);

export const getProductsByPrice = createSelector(
  [getPriceFilter, getVisibleProducts],
  (priceFilter, products) => {
    switch(priceFilter) {
      case 'ASC':
        return products.sort((a, b) => (a.product_price > b.product_price) ? 1 : -1);
      case 'DESC':
        return products.sort((a, b) => (a.product_price < b.product_price) ? 1 : -1);
      default:
        return products;
    }
  }
)



export const getVisibleProductsFilteredByKeyword = createSelector(
  [ getProductsByPrice, getKeyword],
  (productsByPrice, keyword) => productsByPrice.filter(
    product => product.product_name.toLowerCase().search(keyword) !== -1
  )
);




