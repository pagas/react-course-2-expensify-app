import React from 'react';
import {connect} from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expenseTotal from '../selectors/expense-total';
import numeral from 'numeral';

export const ExpenseSummary = ({expenseCount = 0, expenseTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
    return (
    <div>
        <h3>Viewing {expenseCount} {expenseWord} totalling {numeral(expenseTotal / 100).format('$0,0.00')}</h3>
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
