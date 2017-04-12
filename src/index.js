import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import './index.css';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    	<App />
    </Provider>,
    document.getElementById('root')
);
