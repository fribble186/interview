import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import saga from './Sagas'

import userReducer from '@/pages/user/login/reducer'

const reducer = combineReducers({
  user: userReducer,
});

const sagaMiddleWare = createSagaMiddleware()
const middleWares = [sagaMiddleWare];
const win = window;
const storeEnhancers = compose(
  applyMiddleware(...middleWares),
  (win && win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
);
const store = createStore(reducer, storeEnhancers) //storeEnhancers
// const store = createStore(reducer)

sagaMiddleWare.run(saga)
export default store