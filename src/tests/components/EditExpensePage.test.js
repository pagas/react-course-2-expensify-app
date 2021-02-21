import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper, expense = expenses[1];

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn()
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage
        startEditExpense={startEditExpense}
        startRemoveExpense={startRemoveExpense}
        expense={expense}
        history={history}
    />);
})

test('Should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});


test('Should handle on edit expense', () => {
    wrapper.find(ExpenseForm).prop('onSubmit')(expense);

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
})


test('Should handle on remove expense', () => {
    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expense.id});
})

