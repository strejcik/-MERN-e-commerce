import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import { syncTranslationWithStore } from 'react-redux-i18n';
import { loadTranslations, setLocale } from 'react-redux-i18n';
import i18n from '../utils/i18n';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk'

import reducers from '../reducers/index';

import refreshToken from '../middleware/refreshToken';


const persistConfig = {
  key: 'root',
  storage,
}


export const history = createBrowserHistory();



export default function configureStore(preloadedState) {
	const persistedReducer = persistReducer(persistConfig, reducers(history));
    const store = createStore(
      persistedReducer,
      preloadedState,
      compose(
        applyMiddleware(
          routerMiddleware(history),
          thunk,
          refreshToken,
        ),
      ),
    )
    syncTranslationWithStore(store);
    store.dispatch(loadTranslations(i18n));
    store.dispatch(setLocale('pl'));
    return store;
}