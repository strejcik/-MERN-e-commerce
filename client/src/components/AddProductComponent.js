import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Row, Input, Button} from 'react-materialize';
import classNames from 'classnames';
import '../styles/AddProductComponentStyle.css';
import UploadProductComponent from './UploadProductComponent';
import {productPostData} from '../actions/ProductsApiActions';
import {eanValidator, weightValidator, quantityValidator, priceValidator, imageValidator, currencyValidator } from '../utils/validationForm';
let I18n = require('react-redux-i18n').I18n;

class AddProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationError: true,
            eanError: false,
            weightError: false,
            quantityError: false,
            priceError: false,
            imageError: false,
            categoryError: false,
            currencyError: false,
        }
    }
    onNameChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onDescChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onCategoryChange = e => {
        this.setState({
            category: e.target.value
        });
    }
    currencyValidator = e => {
        currencyValidator(e.target.value)?
        this.setState({ currencyError: true }):
        this.setState({ currencyError: false, currency: e.target.value});
    }
    imageValidator = e => {
        imageValidator(e)?
        this.setState({imageError: true}):
        this.setState({imageError: false, image: e.base64})
    }
    eanValidator = (e) => {
        e.preventDefault();
        eanValidator(e.target.value)?
        this.setState({eanError: true}):
        this.setState({eanError: false, [e.target.name]: e.target.value});
        this.errorFormValidator();
    }
    weightValidator = (e) => {
        e.preventDefault();
        weightValidator(e.target.value)?
        this.setState({weightError: true}):
        this.setState({ weightError: false, [e.target.name]: e.target.value});
        this.errorFormValidator();
    }
    quantityValidator = (e) => {
        e.preventDefault();
        quantityValidator(e)?
        this.setState({quantityError: true}):
        this.setState({quantityError: false, [e.target.name]: e.target.value});
        this.errorFormValidator();
    }
    priceValidator = (e) => {
        e.preventDefault();
        priceValidator(e.target.value)?
        this.setState({priceError: true}):
        this.setState({priceError: false, [e.target.name]: e.target.value});
        this.errorFormValidator();
    }
    categoryValidator = e => {

    }
    errorFormValidator = () => {
        this.state.eanError || this.state.priceError ||
        this.state.quantityError || this.state.weightError ?
        this.setState(prevState => { validationError: prevState.validationError = true}):
        this.setState(prevState => { validationError: prevState.validationError = false});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let productObj = {
            name: this.state.name, ean: this.state.ean,
            weight: this.state.weight, price: this.state.price,
            quantity: this.state.quantity, description: this.state.description,
            category: this.state.category, image: this.state.image,
            currency: this.state.currency, sku: Math.floor(Math.random()*9000000000) + 10000
        }
        let isFormFilled = Object.values(productObj).every(x => (x !== null && x !== '' && x!== false && x!==undefined));
        if(!this.state.validationError && isFormFilled) {
             return this.props.productPostData('/api/v1/products/add', productObj);      
         } else {
             return window.Materialize.toast(I18n.t('application.product_toast_fill_form'), 4000);
         }

    }
    render() {
        let productClass = classNames({'valid': true});
        let eanClasses = classNames({'valid': !this.state.eanError, 'invalid': this.state.eanError });
        let weightClasses = classNames({'valid': !this.state.weightError, 'invalid': this.state.weightError });
        let priceClasses = classNames({'valid': !this.state.priceError, 'invalid': this.state.priceError });
        let quantityClasses = classNames({'valid': !this.state.quantityError, 'invalid': this.state.quantityError });
        let descriptionClass = classNames({'valid': true});
        let imageClasses = classNames({'valid': !this.state.imageError, 'invalid': this.state.imageError, 'file-path validate': true});
    
        let productNameLabel = `* ${I18n.t('application.product_name_label')}`;
        let productEanLabel = `* ${I18n.t('application.product_ean_label')}`;
        let productWeightLabel = `* ${I18n.t('application.product_weight_label')}`;
        let productPriceLabel = `* ${I18n.t('application.product_price_label')}`;
        let productQuantityLabel = `* ${I18n.t('application.product_quantity_label')}`;
        let productCategoryLabel = `* ${I18n.t('application.product_choose_category_label')}`;
        let productMobileLabel = `${I18n.t('application.product_mobile_label')}`;
        let productTVLabel = `${I18n.t('application.product_tv_label')}`;
        let productComputerLabel = `${I18n.t('application.product_computer_label')}`;
        let productCameraLabel = `${I18n.t('application.product_camera_label')}`;
        let productCurrencyLabel = `* ${I18n.t('application.product_choose_currency_label')}`;
        let productDescriptionLabel = `* ${I18n.t('application.product_description_label')}`;
        let productAddImageLabel = `* ${I18n.t('application.product_add_img_btn')}`;
        let submitProductLabel = `${I18n.t('application.product_submit_btn')}`;
    return (
    <div className="container">
        <form s={12} onSubmit={e => this.onSubmit(e)} autoComplete="off" encType="multipart/form-data">
        <Row className="input-field">
            <Input 
                s={12} 
                label={productNameLabel} 
                name="name"  
                required="" 
                aria-required="true" 
                className={productClass}
                onChange={e => this.onNameChange(e)}
            />
            <Input 
                type="number"
                onKeyPress={e => {
                    if(e.charCode >= 48 && e.charCode <= 57) {
                        return
                    } else {
                        e.preventDefault();
                    }
                }}
                s={12} 
                label={productEanLabel} 
                name="ean" 
                onChange={e => this.eanValidator(e)} 
                className={eanClasses} 
                onBlur={e => this.eanValidator(e)}
                />
                {
                    this.state.eanError? <span className="input-error col input-field s12">*required, must contain 12 digits</span>: null
                }
            <Input
                step="any"
                type="number"
                s={12} 
                label={productWeightLabel} 
                name="weight" 
                onChange={e => this.weightValidator(e)} 
                className={weightClasses} 
                onBlur={e => this.weightValidator(e)}
            />
                {
                    this.state.weightError? <span className="input-error col input-field s12">*required</span>: null
                }
            <Input 
                step="any"
                type="number"
                s={12} 
                name="price" 
                label={productPriceLabel} 
                onChange={e => this.priceValidator(e)} 
                className={priceClasses} 
                onBlur={e => this.priceValidator(e)}
            />
                {
                    this.state.priceError? <span className="input-error col input-field s12">*required</span>: null
                }
            <Input 
                type="number" 
                s={12} 
                name="quantity" 
                label={productQuantityLabel} 
                onChange={e => this.quantityValidator(e)}
                onKeyPress={e => {
                    if(e.charCode >= 48 && e.charCode <= 57) {
                        return
                    } else {
                        e.preventDefault();
                    }
                }}
                className={quantityClasses}
                onBlur={e => this.quantityValidator(e)}
            />
                {
                  this.state.quantityError? <span className="input-error col input-field s12">*required</span>: null
                }
                <div className="col input-field s12">
                    <select className="browser-default" onChange={e => this.onCategoryChange(e)} defaultValue="">
                    <option value="" disabled>{productCategoryLabel}</option>
                    <option value="Mobile" name="Mobile">{productMobileLabel}</option>
                    <option value="TV" name="TV">{productTVLabel}</option>
                    <option value="Computer" name="Computer">{productComputerLabel}</option>
                    <option value="Camera" name="Camera">{productCameraLabel}</option>
                    </select>
                </div>
                <div className="col input-field s12">
                    <select className="browser-default" onChange={e => this.currencyValidator(e)} defaultValue="">
                    <option value="" disabled>{productCurrencyLabel}</option>
                    <option value="PLN" name="PLN">PLN</option>
                    <option value="EUR" name="EUR">EUR</option>
                    <option value="USD" name="USD">USD</option>
                    </select>
                </div>
                {
                  this.state.currencyError? <span className="input-error col input-field s12">*required</span>: null
                }
            <Input 
                s={12} 
                label={productDescriptionLabel} 
                name="description"  
                required="" 
                aria-required="true" 
                className={descriptionClass}
                onChange={e => this.onDescChange(e)}
            />
                
                
            <UploadProductComponent handleImageFile={this.imageValidator} imageClasses={imageClasses} productAddImageLabel={productAddImageLabel}/>
            {
              this.state.imageError? <span className="input-error col input-field s12">{this.state.imageError}</span>: null
            }
            {
                this.props.isPostLoading && this.props.isPostSuccess ? window.Materialize.toast('Product submitted', 4000): null
            }
            {
                this.props.isPostLoading && this.props.isPostSuccess && !this.props.isPostSuccess ? window.Materialize.toast('Error occured', 4000) : null
            }
            <div className="col input-field s12 ">
                <Button type="submit" name="action" className="btn waves-effect waves-light">{submitProductLabel}<i className="material-icons right">send</i></Button>
            </div>
        </Row>
        </form>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isPostSuccess: state.productPostDataReducer.isSuccess,
        isPostLoading: state.productPostDataReducer.isLoading,
        isPostError: state.productPostDataReducer.postError,
        lang: state.i18n.locale,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productPostData: (url, data) => dispatch(productPostData(url, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProductComponent);


