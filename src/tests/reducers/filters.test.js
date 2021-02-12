import moment from "moment";
import filtersReducer from "../../reducers/filters";

test('Should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount')
});

test('Should set sortBy to date', () => {
    const defaultState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(defaultState, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date')
});

test('Should set text', () => {
    const text = "some text";
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text});
    expect(state.text).toBe(text)
});

test('Should set start date', () => {
    const startDate = moment();
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate});
    expect(state.startDate).toEqual(startDate)
});

test('Should set end date', () => {
    const endDate = moment();
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate});
    expect(state.endDate).toEqual(endDate)
});
