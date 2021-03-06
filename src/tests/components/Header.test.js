import React from 'react';
import {Header} from '../../components/Header';
import {shallow} from "enzyme";

test('Should render Header correctly!', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should call logout on button click', () => {
    const startLogout = jest.fn()
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    wrapper.find('button').simulate('click');

    expect(startLogout).toHaveBeenCalled();
});



