import { createStore, applyMiddleware } from 'redux'
import taskReducer from './reducers/reducerTask'
import thunk from 'redux-thunk'

const store = createStore(taskReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))

export default store
