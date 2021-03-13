import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import expenseTotal from '../selectors/expense-total';
import numeral from 'numeral';

export const ExpenseSummary = ({expenseCount = 0, expenseTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    return (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">
                Viewing <span>{expenseCount}</span> {expenseWord} totalling
                <span> {numeral(expenseTotal / 100).format('$0,0.00')}</span>
            </h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add expense</Link>
            </div>
        </div>
    </div>
    )
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: expenseTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary);
