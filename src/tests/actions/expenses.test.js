import {
    editExpense,
    addExpense,
    removeExpense,
    startAddExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense, startEditExpense
} from '../../actions/expenses';
import expenses from "../fixtures/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const uid = 'mockeduid'
const defaultAuthState = {auth: {uid: uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt};
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    })
});

test('Should remove expenses from database', (done) => {
    const store = createMockStore(defaultAuthState);
    const removeId = expenses[0].id;

    store.dispatch(startRemoveExpense({id: removeId}))
        .then((data) => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id: removeId
            })

            return database.ref(`users/${uid}/expenses/${removeId}`).once('value')
        }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done();
    })
})


test('should setup edit expense action object', () => {
    const action = editExpense('123', {
        note: 'New note value'
    })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            note: 'New note value'
        }
    })
});


test('Should edit expenses in database', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseId = expenses[0].id;
    const updates = {
        description: 'updated',
        note: 'updated',
        amount: 2222,
        createdAt: 2000
    }

    store.dispatch(startEditExpense(expenseId, updates))
        .then((data) => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id: expenseId,
                updates: updates
            })

            return database.ref(`users/${uid}/expenses/${expenseId}`).once('value')
        }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            ...updates
        })
        done();
    })
})


test('should setup setup add expense action object with values', () => {
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('should add expense to the database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData))
        .then((data) => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value')
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
})


test('should add expense with defaults to the database', (done) => {
    const store = createMockStore(defaultAuthState);
    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpense())
        .then((data) => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...defaultData
                }
            })

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value')
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(defaultData);
            done();
        })
})

test('Should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})


test('Should fetch the expenses from database', (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startSetExpenses())
        .then((data) => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            })
            done();
        })
})
