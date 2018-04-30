import {
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_ERROR,
  ADD_COMMENT,
  DELETE_TASK,
  TASK_TO_WORKFLOW
} from '../actions/taskAction';

const initialState = {
    tasks: [],
    showCommentForm: false,
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
    if (action.type === DELETE_TASK) {
        return {...state, tasks: []}
    }
    if (action.type === ADD_COMMENT) {
        return Object.assign({}, state, {
          showCommentForm: true
        })
    }
    if(action.type === TASK_TO_WORKFLOW) {
        return Object.assign({}, state, {
            loading: false,
            error: false,
            tasks: [...state.tasks, action.task.task],
            workflow: action.task.workflow.id
        })
    }

return state;
}
