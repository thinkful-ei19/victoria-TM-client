import { createStore, applyMiddleware, combineReducers } from 'redux'
import { taskReducer } from './reducers/reducerTask';
import { workflowReducer } from './reducers/reducerWorkflow';
import { commentReducer } from './reducers/reducerComment';
import thunk from 'redux-thunk'

const reducers = {
  workflow: workflowReducer,
  task: taskReducer,
  comment: commentReducer
};

const reducer = combineReducers(reducers);


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
export default store
