import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Footer} from 'react-materialize';
import '../styles/FooterComponentStyle.css';
let I18n = require('react-redux-i18n').I18n;
class FooterComponent extends Component {
  render() {
    return (
      <Footer 
      copyrights="&copy; 2019"
      links={
        <ul className="footer-link-wrapper">
        <li className="footer-link-item">
        <a className="btn-floating btn-medium red" href="#" onClick={() => window.open('https://github.com/strejcik')}>
          <i className="large material-icons">contacts</i>
        </a>
        <a className="grey-text text-lighten-4" href="#" onClick={() => window.open('https://github.com/strejcik')}>Github</a>
        </li>
        </ul>
      }
      className='example'
      >
        <h5 className="white-text">{I18n.t('application.footer_header')}</h5>
        <p className="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit turpis ac elit malesuada, interdum tempus urna varius. Quisque sagittis risus sit amet sem tempus, nec vehicula dolor accumsan.</p>
      </Footer>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: state.i18n.locale
  }
}

export default connect(mapStateToProps, {})(FooterComponent);