import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore,  } from './Store';
import { getCampersData }from './Actions';
import App from './App';
import 'milligram';
import './index.css';

const store = configureStore();
store.dispatch(getCampersData());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
