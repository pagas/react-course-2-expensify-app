import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from "./routers/AppRouter";
import configureStore from './store/confitureStore';
import {addExpense} from './actions/expenses';
import visibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({description: 'Water bill', amount: 4500}))
store.dispatch(addExpense({description: 'Gas bill', amount: 3300, createdAt: 1000}))
store.dispatch(addExpense({description: 'Rent', amount: 109500}))

console.log('store:', store.getState());

const state = store.getState();
console.log(visibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))




