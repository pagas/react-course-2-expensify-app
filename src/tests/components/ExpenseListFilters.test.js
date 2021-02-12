import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import {filters, altFilters} from "../fixtures/filters";
import {DateRangePicker} from 'react-dates';
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
})

test('Should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot()
});

test('Should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
});

test('Should render ExpenseListFilters with alt data correctly', () => {
    const value = 'Text changed';
    wrapper.find('input').simulate('change', {
        target: {value: value}
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
});

test('Should sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find('select').simulate('change', {
        target: {value: 'date'}
    })
    expect(sortByDate).toHaveBeenCalled()
});

test('Should sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: {value: 'amount'}
    })
    expect(sortByAmount).toHaveBeenCalled()
});

test('Should sort by amount', () => {
    const startDate = moment(0);
    const endDate = moment(0).add(3, 'days');
    wrapper.find(DateRangePicker).prop('onDatesChange')({
        startDate,
        endDate
    })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
    const focused = "startDate"
    wrapper.find(DateRangePicker).prop('onFocusChange')(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
});

