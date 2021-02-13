import React from 'react';
import {ExpenseSummary} from "../../components/ExpenseSummary";
import {shallow} from 'enzyme';

test('Should show ExpenseSummary with count and total equal to 0', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={0} expenseTotal={0} />)
    expect(wrapper).toMatchSnapshot();
});

test('Should show empty ExpenseSummary with count equal to 1', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={233} />)
    expect(wrapper).toMatchSnapshot();
});

test('Should show correct ExpenseSummary with multiple count and totals', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={22} expenseTotal={23432} />)
    expect(wrapper).toMatchSnapshot();
});
