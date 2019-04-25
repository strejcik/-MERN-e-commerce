import React, {Component} from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import translations from './utils/i18n';
import Routes from './routes';

import configureStore from './store';


function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}


export default class App extends Component {
  state = { rehydrated: false }
  componentDidMount(){
    demoAsyncCall().then(() => {
	   	let store = configureStore();
	    persistStore(store, {}, () => {
	      this.setState({ rehydrated: true })
	    });
    })
  }

  render() {
    if(!this.state.rehydrated){
      return null;
    }
    let preloadedState = {
      token: localStorage.getItem('user')
    }
    const persistor = persistStore(configureStore());
    return (
      <Provider store={configureStore()}>
		      <PersistGate loading={null} persistor={persistor}>
		          	<Routes/>
		      </PersistGate>
      </Provider>
  )
  }
}


