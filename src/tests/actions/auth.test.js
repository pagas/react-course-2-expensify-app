import {logout, login} from "../../actions/auth";

test('should setup set login action object with value', () => {
    const userId = '123';
    const action = login({uid: userId})
    expect(action).toEqual({
        type: 'LOGIN',
        uid: userId
    })
});

test('should setup set logout action object', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
});

