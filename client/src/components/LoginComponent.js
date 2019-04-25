import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';
import classNames from 'classnames';
import Recaptcha from 'react-recaptcha';
import { login } from '../actions/userActions';
import { verifyCaptcha } from '../actions/captchaActions';
import '../styles/LoginComponentStyle.css';
let I18n = require('react-redux-i18n').I18n;
class LoginComponent extends Component {
     constructor(props) {
        super(props);
        this.state = {
            isVerified: false
        }
        this.recaptcha = React.createRef();
      }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { login } = this.props;
        const { username, password } = this.state;
        if(!this.state.isVerified) {
            return window.Materialize.toast(I18n.t('application.toast_verify_human'), 4000)
        }
        login(username, password);
    }
    onloadCallback = () => {
      
    }
    verifyCallback = (response) => {
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
    render() {
  	const emailClasses = classNames('');
    const passwordClasses = classNames('');
    const alertClasses = classNames({'alert-danger': this.props.alertType === 'alert-danger', 'alert-success': this.props.alertType === 'alert-success'});
    const loginUsernameLabel = I18n.t('application.login_username_label');
    const loginPasswordLabel = I18n.t('application.login_password_label');
    const loginSubmitBtn = I18n.t('application.login_submit_btn');
    return (
      <div className="container login-wrapper">
        <form s={12} onSubmit={e => this.onSubmit(e)} autoComplete="off">
        <Row className="input-field">
            <Input 
                type="text"
                autoComplete={'username'}
                s={12} 
                label={loginUsernameLabel} 
                name="username"  
                required={true}
                aria-required="true" 
                className={emailClasses}
                onChange={e => this.onChange(e)}
            />
            <Input 
                type="password"
                autoComplete={'password'}
                s={12} 
                label={loginPasswordLabel} 
                name="password"  
                required={true}
                aria-required="true" 
                className={passwordClasses}
                onChange={e => this.onChange(e)}
            />
            {
                this.props.alert? <div className={`col ${alertClasses}`}>{this.props.alert}</div>:null
            }
            <div className="col input-field s12 ">
                <Button type="submit" name="action" className="btn waves-effect waves-light">{loginSubmitBtn}<i className="material-icons right">send</i></Button>
            </div>
        </Row>
        <Row>
             <Recaptcha
                ref={(e) => this.recaptcha = e}
                sitekey="6LdA2pgUAAAAABj5HnUdB1A3FZVmnpvw1Y_vbdeq"
                render="explicit"
                verifyCallback={(res) => this.verifyCallback(res)}
                onloadCallback={this.onloadCallback}
                expiredCallback={() => this.onExpireCallback()}
                render={'onload'}
                theme={'dark'}
                type={'image'}
                size={'normal'}
                tabindex={'0'}
                hl={'en'}
                badge={'bottomright'}
            />
        </Row>
        </form>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alertReducer.message,
        alertType: state.alertReducer.type,
        loggingIn: state.authReducer.loggingIn,
        loggedIn: state.authReducer.loggedIn,
        lang: state.i18n.locale
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username,password) => dispatch(login(username, password)),
        verifyCaptcha: (captcha) => dispatch(verifyCaptcha(captcha))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

