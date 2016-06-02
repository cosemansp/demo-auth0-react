import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    return next(action);
};


const promise = () => next => action => {
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
};

const logger = store => next => action => {
    console.group(action.type);
    console.log('%c prev state', 'color:gray', store.getState());
    console.log('%c action', 'color:blue', action);
    const result = next(action);
    console.log('%c next state', 'color:green', store.getState());
    console.groupEnd(action.type);
    return result;
};

const configureStore = () => {
    return createStore(
        rootReducer,
        applyMiddleware(promise, thunk, logger)
    );
};

export default configureStore;
