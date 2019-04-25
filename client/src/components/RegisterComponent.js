import React, { Component } from 'react'
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';
import classNames from 'classnames';
import { Row, Input, Button, Checkbox} from 'react-materialize';
import { emailValidator, passwordValidator, userNameValidator} from '../utils/validationForm';
import '../styles/RegisterComponentStyle.css';
import {register} from '../actions/userActions';
import { verifyCaptcha } from '../actions/captchaActions';
let I18n = require('react-redux-i18n').I18n;

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified:false,
            terms: false,
            username: '',
            email: '',
            password: '',
            confirmationPassword: '',
            errors:{}
        }
        this.recaptcha = React.createRef();
    }
    userNameValidator = (e) => {
        let username = e;
        if(!userNameValidator(username)) {
        	this.setState({
        		errors: {
        			...this.state.errors,
        			[e.target.name]: 'User can not be empty'
        		}
        	});
        } else {
	        this.setState({
	            [e.target.name]: e.target.value
	        });
        }
    }
    emailValidator = (e) => {
    	let email = e;
        if(!emailValidator(email)) {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    [e.target.name]: 'Email is incorrect'
                }
            })
        } else {
            let deleteKeys = Object.assign({}, this.state);
            delete deleteKeys.errors["email"];
            this.setState({
                ...deleteKeys,
                [e.target.name]: e.target.value
            })
        }
    }
    passwordValidator = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        let passwordObj = Object.assign({}, {
            password: this.state.password,
            confirmationPassword: this.state.confirmationPassword
        });
        let errors = passwordValidator(passwordObj).errors;
        let checkIfEmptyObj = Object.keys(passwordValidator(passwordObj).errors).length !== 0;
        if(errors && checkIfEmptyObj) {
            this.setState({
                errors: {...this.state.errors, ...errors}
            })
        } else {
            let deleteKeys = Object.assign({}, this.state);
            delete deleteKeys.errors["password"];
            delete deleteKeys.errors["confirmationPassword"];
            this.setState(deleteKeys);
        }
    }
    registerValidation = () => {
        let errors = Object.assign({}, this.state.errors);
        let formValues = Object.assign({}, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmationPassword: this.state.confirmationPassword,
            terms: this.state.terms,
            isVerified: this.state.isVerified,
        })
        let isFormFilled = Object.values(formValues).every(x => (x !== null && x !== '' && x!== false));
        let noErrors = Object.keys(errors).length === 0? true: false;
        let termsValidation = this.termsValidator() ? true : false;
        if(isFormFilled && noErrors && termsValidation) {
            return true;
        } else {
            return false;
        }
    }
    onloadCallback = () => {
      
    }
    captchaValidator = (response) => {
      const { verifyCaptcha } = this.props;
      if(response) {
          this.setState({
              isVerified: true
          });
          verifyCaptcha(response);
      }
    }
    onExpireCallback = () => {
        this.recaptcha.reset(Math.floor((Math.random() * 100) + 1));
        this.setState({
              isVerified: false
        });
    }
    termsValidator = () => {
        const { terms } = this.state;
        if(!terms) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    terms: 'Accept agreement'
                }
            })
            return false;
        } else {
            let deleteKeys = Object.assign({}, this.state);
            delete deleteKeys.errors["terms"];
            this.setState({
                ...deleteKeys,
                terms: true
            })
            return true;
        }
    }
    terms = (e) => {
        let terms = this.state.terms;
        this.setState({
            [e.target.name]: !this.state.terms
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { register } = this.props;
        const { username, email, password} = this.state;
        let user = Object.assign({}, {
            username,
            email,
            password,
        });
        if(!this.state.isVerified) {
            return window.alert('Please verify you are a human', 'Ok');
        }
        if(this.registerValidation() === true) {
            register(user);
        }
    }
    render() {
        let usernameClasses = classNames({'valid': !this.state.errors.username, 'invalid': this.state.errors.username });
        let emailClasses = classNames({'valid': !this.state.errors.email, 'invalid': this.state.errors.email });
        let passwordClasses = classNames({'valid': !this.state.errors.password, 'invalid': this.state.errors.password });
        let confirmationClasses = classNames({'valid': !this.state.errors.confirmationPassword, 'invalid': this.state.errors.confirmationPassword });
        let termsClasses = classNames({'valid': !this.state.errors.terms, 'invalid': this.state.errors.terms});
    return (
        <div className="container">
        <form s={12} onSubmit={e => this.onSubmit(e)} autoComplete="off">
        <Row className="input-field">
            <Input 
                type="text"
                s={12} 
                label={I18n.t('application.register_username_label')}
                name="username"
                autoComplete="username"
                required={true}
                aria-required="true" 
                className={usernameClasses}
                onChange={e => this.userNameValidator(e)}
            />
            <Input 
                type="email"
                s={12} 
                label={I18n.t('application.register_email_label')} 
                name="email"
                required={true}
                aria-required="true" 
                onChange={e => this.emailValidator(e)} 
                className={emailClasses}
                onBlur={e => this.emailValidator(e)}
                onFocus={() => this.setState({email: ''})}
            />
            {this.state.errors.email && this.state.email !== ''? <span className="input-error col input-field s12">{this.state.errors.email}</span>: null}
            <Input
                type="password"
                s={12} 
                label={I18n.t('application.register_password_label')} 
                name="password"
                autoComplete="new-password"
                required={true}  
                aria-required="true" 
                onChange={e => this.passwordValidator(e)} 
                className={passwordClasses} 
                onBlur={e => this.passwordValidator(e)}
                onFocus={(e) => {
                    e.target.value="";
                    this.setState({password: ''})
                }}
            />
            {this.state.errors.password && this.state.password !=='' ? <span className="input-error col input-field s12">{this.state.errors.password}</span>: null}
                <Input
                type="password"
                s={12} 
                label={I18n.t('application.register_confirmation_label')} 
                name="confirmationPassword"
                autoComplete="new-password"
                required={true}
                aria-required="true" 
                onChange={e => this.passwordValidator(e)} 
                className={confirmationClasses} 
                onBlur={e => this.passwordValidator(e)}
                onFocus={(e) => {
                    e.target.value=""
                    this.setState({confirmationPassword: ''})
                }}
            />
            {this.state.errors.confirmationPassword ? <span className="input-error col input-field s12">{this.state.errors.confirmationPassword}</span>: null}
            <div className="col s12 terms-checkbox">
                <input
                    id ="checkbox_id"
                    type="checkbox"
                    name="terms"
                    checked={this.state.terms}
                    onChange={(e) => this.terms(e)}
                />
                <label htmlFor="checkbox_id">{I18n.t('application.register_terms_checkbox_p1')} <a href="/terms">{I18n.t('application.register_terms_checkbox_p2')}</a></label>
             </div>
             {this.state.errors.terms && this.state.terms !== ''? <span className="input-error col input-field s12">{this.state.errors.terms}</span>: null}
            <div className="col input-field s12 ">
                <Button type="submit" name="action" className="btn waves-effect waves-light">{I18n.t('application.register_submit_btn')}<i className="material-icons right">send</i></Button>
            </div>
        </Row>
        <Row className="input-field">
             <Recaptcha
                ref={e => this.recaptcha = e}
                sitekey="6LdA2pgUAAAAABj5HnUdB1A3FZVmnpvw1Y_vbdeq"
                render="explicit"
                verifyCallback={(res) => this.captchaValidator(res)}
                onloadCallback={this.onloadCallback}
                expiredCallback={() => this.onExpireCallback()}
                theme={'dark'}
                type={'image'}
                size={'normal'}
                tabindex={'0'}
                hl={'en'}
                badge={'bottomright'}
                className={"col input-field s12"}
            />
        </Row>
        </form>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        lang: state.i18n.locale
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(register(user)),
        verifyCaptcha: (captcha) => dispatch(verifyCaptcha(captcha)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
