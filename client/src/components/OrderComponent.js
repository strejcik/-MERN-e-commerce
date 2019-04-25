import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import { Card, Col, Container, Row} from 'react-materialize';
import SmoothImage from 'react-smooth-image';
import {connect} from 'react-redux';
let I18n = require('react-redux-i18n').I18n;

class OrderComponent extends Component {
  state = {
    orders: [],
    loaded: false
  }
  componentDidMount() {
    let userToken = JSON.parse(localStorage.getItem('user')).token;
    if(userToken){ 
    let userTokenDecoded = jwt_decode(localStorage.getItem('user'));
    let id = userTokenDecoded._id;
    fetch(`/api/v1/order/list/${id}`,{
      method:'GET',
      headers: {
        "Authorization": "Bearer " + userToken,
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
    .then(response => this.setState({orders: response, loaded: true}));
    }
  }
  orderInfo = (product) => {
    return (
      <div>
        <ul>
          <li>{I18n.t('application.order_category_header')}: {product.product_category}</li>
          <li>{I18n.t('application.order_description_header')}: {product.product_description}</li>
          <li>{I18n.t('application.order_currency_header')}: {product.product_currency}</li>
          <li>{I18n.t('application.order_price_header')}: {product.product_formattedPrice}</li>
          <li>{I18n.t('application.order_totals_header')}: {product.product_price*product.product_quantity}
                                                           {product.product_currency === 'PLN' && ' zł'}
                                                           {product.product_currency === 'USD' && ' $'}
                                                           {product.product_currency === 'EUR' && ' €'}</li>
        </ul>
      </div>
    )
  }
  render() {
    const { loaded, orders } = this.state;
    return (
        <React.Fragment>
            <Container>
              <Row>
                {loaded && orders.map((e, i) => {
                  return (
                    <Col l={4} m={6} s={12} key={i}>
                    <Card header={<SmoothImage
                                            src={e.product_image}
                                            alt="product_image"
                                            transitionTime={2.0}
	      	          />} title={e.product_name + ' x ' + e.product_quantity} reveal={this.orderInfo(e)} key={i}>
                    </Card>
                    </Col>
                  )
                })}
              </Row>
            </Container>

        </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: state.i18n.locale,
  }
}

export default connect(mapStateToProps, {})(OrderComponent);
