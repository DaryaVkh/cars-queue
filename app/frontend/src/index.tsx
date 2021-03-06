import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app';
import {applyMiddleware, compose, createStore, Store} from "redux";
import rootReducer from './redux/reducers/root-reducer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {AppReducerState} from './redux/reducers/app-reducer/app-reducer.interfaces';

export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export interface AppStore {
    appReducer: AppReducerState
}

export const store: Store<AppStore> = createStore(rootReducer, composeEnhancers(applyMiddleware()));

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);
