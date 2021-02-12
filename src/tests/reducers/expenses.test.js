import expensesReducer from "../../reducers/expenses";
import expenses from '../fixtures/expenses';

test('Should set up default expenses values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual([])
});

test('Should remove expense by id', () => {
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: expenses[1].id});
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expense by invaild id', () => {
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '00'});
    expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
    const expense = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'this was last months rent'
    };
    const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense});
    expect(state).toEqual([...expenses, expense])
});

test('Should edit an expense', () => {
    const update = {
        description: 'Rent update',
        amount: 109511,
        createdAt: 2000,
        note: 'this was last months rent update'
    }
    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: update
    });
    expect(state[1]).toEqual({...expenses[1], ...update})
});

test('Should not edit an expense if id does not exist ', () => {
    const update = {
        description: 'Rent update',
        amount: 109511,
        createdAt: 2000,
        note: 'this was last months rent update'
    }
    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: '000',
        updates: update
    });
    expect(state).toEqual(expenses)
});
