import React from 'react';
import { ToastContainer, toast, Zoom} from 'react-toastify';
import classNames from 'classnames';
import '../styles/ToastStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/PayPalComponentStyle.css';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { client } from '../utils/paypal';
import jwt_decode from 'jwt-decode';


const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
    };
  }
  successNotify = () => {
    const toastifyStyles = classNames('order-success-toast');
    let str= '✓';
    toast(str, {
      toastId: 12,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_RIGHT,
      draggable: false,
      closeButton: false,
      hideProgressBar: true,
      className: toastifyStyles
    });
  }
  failureNotify = () => {
    const toastifyStyles = classNames('order-failure-toast');
    let str= 'X';
    toast(str, {
      toastId: 12,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_RIGHT,
      draggable: false,
      closeButton: false,
      hideProgressBar: true,
      className: toastifyStyles
    });
  }
  cancelNotify = () => {
    const toastifyStyles = classNames('order-cancel-toast');
    let str= 'X';
    toast(str, {
      toastId: 12,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_RIGHT,
      draggable: false,
      closeButton: false,
      hideProgressBar: true,
      className: toastifyStyles
    });
  }
  componentDidMount() {
    this.setState({ showButton: true });
  }
  postOrder = (url, order) => {
    const { removeAllFromCart, refreshToken} = this.props;
    
    const handleResponse = (response) =>{
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                  refreshToken();
                }
                const error = (data && data.message) || response.statusText;
                
                //If error occured display message in console and show toast   
                this.onError(error);
                return error;
            }
                //if successful show toast and remove all items form cart
            this.successNotify();    
            setTimeout(() => {
              removeAllFromCart();
              return data;
            }, 3000);
        });
    }
    
    
    let userToken = JSON.parse(localStorage.getItem('user')).token;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(order)
    }
    return fetch(url, options).then(handleResponse);
  
  
  }
  createOrder = (payment) => {
    const { 
      cart
    } = this.props;
    let user = localStorage.getItem('user');
    let decoded_user = jwt_decode(user);
    let products = [...cart];
    let postData = {
      uid: decoded_user._id,
      token: user,
      payerID: payment.payerID,
      paymentID: payment.paymentID,
      paymentToken: payment.paymentToken,
      products: products
   };
    this.postOrder('/api/v1/order/pay', postData);
  }

  onSuccess = (payment) => this.createOrder(payment);
  
  onError = (error) =>{
    console.log(error);
    this.failureNotify();
  }

  onCancel = (data) => {
    console.log(data);
    this.cancelNotify();
  }

  render() {
    const {
      showButton,
    } = this.state;
    const {
      currency,
      total
    } = this.props;
    return (
      <div>
        {showButton && 
        <PaypalExpressBtn
          env={ENV}
          client={client}
          onSuccess={this.onSuccess}
          onCancel={this.onCancel}
          onError={this.onError}
          total={total}
          currency={currency}
        />}
        <ToastContainer 
          pauseOnFocusLoss={false} 
          autoClose={2000}
          transition={Zoom}
          toastClassName='toast'
      />
    </div>
    )
  }
}
const PaypalComponent = PaypalButton;


export default (PaypalComponent);