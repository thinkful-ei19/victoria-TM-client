import { FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_ERROR} from '../actions/taskAction';

const initialState = {
    tasks: [],
    loading: false,
    error: null
};

export function taskReducer(state = initialState, action) {
    if(action.type === FETCH_TASK_REQUEST) {
        return Object.assign({}, state, {loading: true});
    }
    if(action.type === FETCH_TASK_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: false,
            tasks: [...state.tasks, action.tasks]
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
