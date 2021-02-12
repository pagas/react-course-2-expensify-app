import {v4 as uuidv4} from 'uuid';

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

export {addExpense, editExpense, removeExpense}
