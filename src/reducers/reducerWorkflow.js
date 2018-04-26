import { FETCH_WORKFLOW_REQUEST, FETCH_WORKFLOW_SUCCESS, FETCH_WORKFLOW_ERROR} from '../actions/workflowAction';

const initialState = {
    workflows: [],
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

return state;
}
