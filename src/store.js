import { createStore, applyMiddleware, combineReducers } from 'redux'
import { workflowsReducer } from './reducers/reducerWorkflow';
import thunk from 'redux-thunk'

const reducers = {
  workflow: workflowsReducer
};

const reducer = combineReducers(reducers);


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
export default store
