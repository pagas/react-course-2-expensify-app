import React from 'react';
import ExpenseForm from "../../components/ExpenseForm";
import {SingleDatePicker} from "react-dates";
import {shallow} from 'enzyme';
import expenses from "../fixtures/expenses";
import moment from "moment";

test('Should render Expense form', () => {
    const wrapper = shallow(<ExpenseForm/>)
    expect(wrapper).toMatchSnapshot();
})

test('Should render Expense form with data', () => {
    const expense = expenses[0];
    const wrapper = shallow(<ExpenseForm expense={expense}/>)
    expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid submission', () => {
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {
        }
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
})

test('Should set description on input change', () => {
    const value = 'New Description';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(0).simulate('change', {
        target: {value: value}
    })

    expect(wrapper.state('description')).toBe(value);
})

test('Should set note on textarea change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('textarea').simulate('change', {
        target: {value: value}
    })

    expect(wrapper.state('note')).toBe(value);
})


test('Should set amount if valid input 23.50', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change', {
        target: {value: value}
    })

    expect(wrapper.state('amount')).toBe(value);
})

test('Should set amount if invalid input 12.123', () => {
    const value = '12.123';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change', {
        target: {value: value}
    })

    expect(wrapper.state('amount')).toBe("");
})

test('Should call onSubmit prop for valid from submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {
        }
    })

    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        "amount": expenses[0].amount,
        "createdAt": expenses[0].createdAt,
        "description": expenses[0].description,
        "note": expenses[0].note
    });
});

test('Should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find(SingleDatePicker).prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
})

test('Should set focus on focus date picker', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find(SingleDatePicker).prop('onFocusChange')(focused);

    expect(wrapper.state('calendarFocused')).toBe(focused);
})

