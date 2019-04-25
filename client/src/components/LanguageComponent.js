import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import { setLocale } from 'react-redux-i18n';
import { connect } from 'react-redux';
import '../styles/LanguageComponentStyle.css';
import { setLocaleCart, removeAllFromCart } from '../actions/productsActions';
import { cartDeleteAllData, productsFetchData} from '../actions/ProductsApiActions';

let I18n = require('react-redux-i18n').I18n;

class LanguageComponentClass extends Component {
		componentDidMount() {
			const { 
				lang,
				setLocale, setLocaleCart } = this.props; 
			let lng = localStorage.getItem('i18nextLng');
			if(lng === undefined) {
				setLocale(lang);
				setLocaleCart(lang);
			}
			if(lng !== 'pl' || lng !== 'en' || lng!== 'fr') {
				setLocale(lang);
				setLocaleCart(lang);
			}
			localStorage.setItem('i18nextLng', lang);
			setLocale(lang);
			setLocaleCart(lang);
		}
		handleLanguageChange = e => {
			const { removeAllFromCart, cartDeleteAllData, productsFetchData} = this.props; 
    	const language = e.target.value;
			const { setLocale, setLocaleCart} = this.props;
			localStorage.setItem('i18nextLng', language);
			removeAllFromCart();
			setLocale(language);
			setLocaleCart(language);
			cartDeleteAllData('/api/v1/cart/all');
			productsFetchData('/api/v1/products')
		}
    render() {
			const { lang } = this.props;
    return (
        <React.Fragment>
	        <ul className="language-list">
						<li className="language-list-item">
								<p>
									<label>
									<input
										id="pl"
										value="pl"
										name="lng"
										type="radio"
										onChange={e => this.handleLanguageChange(e)}
										checked={lang === 'pl'}
									/>
									<span>pl</span>
									</label>
								</p>
						</li>
						<li className="language-list-item">
							<p>
								<label>
								<input
									id="en"
									value="en"
									name="lng"
									type="radio"
									onChange={e => this.handleLanguageChange(e)}
									checked={lang === 'en'}
								/>
								<span>en</span>
								</label>
							</p>
						</li>
						<li className="language-list-item">
						<p>
							<label>
							<input
								id="fr"
								value="fr"
								name="lng"
								type="radio"
								onChange={e => this.handleLanguageChange(e)}
								checked={lang === 'fr'}
							/>
							<span>fr</span>
							</label>
						</p>
						</li>
					</ul>
        </React.Fragment>
    )
  }
}



const mapStateToProps = state => {
	return {
		lang: state.i18n.locale
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setLocale: (locale) => dispatch(setLocale(locale)),
		setLocaleCart: (locale) => dispatch(setLocaleCart(locale)),
		removeAllFromCart: () => dispatch(removeAllFromCart()),
		cartDeleteAllData: (url) => dispatch(cartDeleteAllData(url)),
		productsFetchData: (url) => dispatch(productsFetchData(url)),
	}
}

const LanguageComponent = withTranslation()(LanguageComponentClass);

export default connect(mapStateToProps, mapDispatchToProps)(LanguageComponent);

