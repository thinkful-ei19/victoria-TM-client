import { FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_ERROR} from '../actions/action';
import thunk from 'redux';

const initialState = {
    tasks: [],
    loading: false,
    error: null
};

const taskReducer = (state = initialState, action) => {
    if(action.type === FETCH_TASK_REQUEST) {
        return Object.assign({}, state, {loading: true});
    }
    if(action.type === FETCH_TASK_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: false,
            tasks: action.tasks
        })
    }
    if(action.type === FETCH_TASK_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        } )
    }

return state;
}

export default taskReducer
