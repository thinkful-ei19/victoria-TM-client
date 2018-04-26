import { createStore, applyMiddleware, combineReducers } from 'redux'
import { taskReducer } from './reducers/reducerTask';
import { workflowReducer } from './reducers/reducerWorkflow';
import thunk from 'redux-thunk'

const reducers = {
  workflow: workflowReducer,
  task: taskReducer
};

const reducer = combineReducers(reducers);


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
console.log(store.getState())
export default store
