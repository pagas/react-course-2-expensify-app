import database from '../firebase/firebase';

const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense: expense
})

const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {description = '', note = '', amount = 0, createdAt = 0} = expenseData;
        const expense = {description, note, amount, createdAt};

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((snapshot) => {
            let expenses = [];
            snapshot.forEach(childSnapshot => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpenses(expenses))
        })
    }
};

export {addExpense, editExpense, removeExpense, startAddExpense}
