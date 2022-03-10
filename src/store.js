import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers';


export const store = createStore(rootReducer, 
                                 compose(applyMiddleware(thunk),
                                 devToolsEnhancer()));


export default store;

