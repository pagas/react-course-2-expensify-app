import {createStore} from "redux";

// Action generators - return action objects
// function have auto-completion while string don't
// returns a error if u mistype function name, it doesn't for strings

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const set = ({count}) => ({
    type: 'SET',
    count
})

const reset = () => ({
    type: 'RESET'
})

// Reducers
// 1. Reducers are pure functions
// 2. Never directly change the state and action

const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {count: state.count + action.incrementBy};
        case 'DECREMENT':
            return {count: state.count - action.decrementBy};
        case 'SET':
            return {count: action.count};
        case 'RESET':
            return {count: 0};
        default:
            return state;
    }
}

const store = createStore(countReducer);

store.subscribe(() => {

});

console.log('init state', store.getState());

store.dispatch(incrementCount());

store.dispatch(incrementCount({incrementBy: 5}));

console.log('increment state', store.getState());

store.dispatch(decrementCount({decrementBy: 2}));
console.log('decrement state', store.getState());

store.dispatch(set({count: 10}));
console.log('set state', store.getState());

store.dispatch(reset());

console.log('reset state', store.getState());
