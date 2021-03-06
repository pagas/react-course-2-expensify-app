import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {startSetExpenses} from "./actions/expenses";

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter, {history} from "./routers/AppRouter";
import configureStore from './store/confitureStore';

import {login, logout} from "./actions/auth";

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

import {firebase} from './firebase/firebase';

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true;
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user))
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        })
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/')
    }
})




