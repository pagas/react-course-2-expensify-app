import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper, expense = expenses[1];

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn()
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage
        editExpense={editExpense}
        removeExpense={removeExpense}
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
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
})


test('Should handle on remove expense', () => {
    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({id: expense.id});
})

