import moment from "moment";
import {
    setEndDate,
    setStartDate,
    sortByAmount,
    sortByDate,
    setTextFilter
} from '../../actions/filters';

test('should setup set text filter action object with value', () => {
    const action = setTextFilter('text')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'text'
    })
});

test('should setup set text filter action object with default values', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

test('should setup set sort by amount filter action object ', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});

test('should setup set sort by date filter action object ', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    })
});

test('should setup set start date filter action object ', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
});

test('should setup set end date filter action object ', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
});

