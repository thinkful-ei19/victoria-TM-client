import { FETCH_WORKFLOW_REQUEST, FETCH_WORKFLOW_SUCCESS, FETCH_WORKFLOW_ERROR, ADD_TASK, ADD_WORKFLOW } from '../actions/workflowAction';

const initialState = {
    workflows: [],
    showTaskForm: false,
    showWorkflowForm: false,
    loading: false,
    error: null
};

export function workflowReducer(state = initialState, action) {
    if(action.type === FETCH_WORKFLOW_REQUEST) {
        return Object.assign({}, state, {loading: true});
    }
    if(action.type === FETCH_WORKFLOW_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: false,
            workflows: action.workflows
        })
    }
    if(action.type === FETCH_WORKFLOW_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        } )
    }
    if (action.type === ADD_WORKFLOW) {
        return Object.assign({}, state, {
          showWorkflowForm: true
        })
    }
    if (action.type === ADD_TASK) {
        return Object.assign({}, state, {
          showTaskForm: true
        })
    }

return state;
}
