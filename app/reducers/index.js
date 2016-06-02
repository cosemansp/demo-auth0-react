import { combineReducers } from 'redux';

const auth = (state = {}, action) => {
    switch (action.type) {
    case 'LOGOUT':
        return {
            profile: null,
            token: null,
        };

    case 'LOGIN_AUTH0_REQUEST':
        return {
            ...state,
            pending: true,
            error: null,
            profile: null,
        };

    case 'LOGIN_AUTH0_SUCCESS':
        return {
            ...state,
            pending: false,
            profile: action.profile,
            token: action.token,
        };

    case 'LOGIN_AUTH0_FAILED':
        return {
            ...state,
            pending: false,
            error: action.error,
        };

    default:
        return state;
    }
};

export default combineReducers({
    auth,
});

