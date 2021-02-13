import expensesTotal from '../../selectors/expense-total'
import expenses from '../fixtures/expenses';

test('Should return zero if no expense', () => {
    const result = expensesTotal([]);
    expect(result).toBe(0);
})

test('Should correctly add up a single expense', () => {
    const result = expensesTotal([expenses[0]]);
    expect(result).toBe(195);
})

test('Should correctly add up a multiple expenses', () => {
    const result = expensesTotal(expenses);
    expect(result).toBe(114195);
})


