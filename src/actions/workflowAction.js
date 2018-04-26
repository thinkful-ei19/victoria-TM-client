import { API_BASE_URL } from '../config'

export const FETCH_WORKFLOW_REQUEST = 'FETCH_WORKFLOW_REQUEST'
export const fetchWorkflowRequest = () => ({
    type: FETCH_WORKFLOW_REQUEST
});

export const FETCH_WORKFLOW_SUCCESS = 'FETCH_WORKFLOW_SUCCESS'
export const fetchWorkflowSuccess = (workflows) => ({
    type: FETCH_WORKFLOW_SUCCESS,
    workflows
});

export const FETCH_WORKFLOW_ERROR = 'FETCH_WORKFLOW_ERROR'
export const fetchWorkflowError = (error) => ({
    type: FETCH_WORKFLOW_ERROR,
    error
});

export const fetchWorkflow = () => dispatch => {
   dispatch(fetchWorkflowRequest());

    fetch(`${API_BASE_URL}/workflows`)
        .then(res =>
            res.json())
        .then(workflows => dispatch(fetchWorkflowSuccess(workflows)))
        .catch(err => {
            console.log(err);
            dispatch(fetchWorkflowError(err))
        })
}
