import React from 'react'
import ShoppingComponent from '../components/ShoppingComponent';

export default (props) => {
  const fetchUrl = `/api/v1/products`;
  const filterBy = 'SHOW_ALL';
  return (
      <React.Fragment>
          <ShoppingComponent fetchUrl={fetchUrl} filterBy={filterBy}/>
      </React.Fragment>
  )
}
