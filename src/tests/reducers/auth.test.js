import authReducer from "../../reducers/auth";

test('Should set up uid value', () => {
    const userId = '123';
    const action = {
        type: 'LOGIN',
        uid: userId
    }
    const state = authReducer(undefined, action);
    expect(state.uid).toEqual(userId)
});

test('Should set up state to empty object', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'something'}, action);
    expect(state).toEqual({})
});
