import React from 'react';
import ProductsListComponent from '../components/ProductsListComponent';
import FilterComponent from '../components/filterWidget/FilterComponent';
import FooterComponent from '../components/FooterComponent';
import '../styles/FilterComponentStyle.css';

export default () => {
  const fetchUrl = `/api/v1/products/cameras`;
  const filterBy = 'SHOW_CAMERAS';
  return(
    <React.Fragment>
    <div className="row">
      <div className="col s4 m3 l2 filter-widget-wrapper">
        <FilterComponent/>
      </div>
      <div className="col s8 m9 l10">
        <ProductsListComponent fetchUrl={fetchUrl} filterBy={filterBy}/>
      </div>
    </div>
    <FooterComponent />
    </React.Fragment>)
};