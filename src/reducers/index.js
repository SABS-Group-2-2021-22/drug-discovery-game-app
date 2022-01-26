import { combineReducers } from 'redux';

import { loginReducer } from "./login_reducer"

// create root reducer by combining all reducers, each of which only accesses a subset of state dict
const rootReducer = combineReducers({
    login: loginReducer
});

export default rootReducer