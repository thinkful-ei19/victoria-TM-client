import { API_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form'

export const FETCH_WORKFLOW_REQUEST = 'FETCH_WORKFLOW_REQUEST'
export const fetchWorkflowRequest = () => ({
    type: FETCH_WORKFLOW_REQUEST
});

export const FETCH_WORKFLOW_SUCCESS = 'FETCH_WORKFLOW_SUCCESS'
export const fetchWorkflowSuccess = (workflows) => {

  return ({
    type: FETCH_WORKFLOW_SUCCESS,
    workflows
})};

export const FETCH_WORKFLOW_ERROR = 'FETCH_WORKFLOW_ERROR'
export const fetchWorkflowError = (error) => ({
    type: FETCH_WORKFLOW_ERROR,
    error
});

export const ADD_WORKFLOW = 'ADD_WORKFLOW';
export const addWorkflow = (workflow) => ({
    type: ADD_WORKFLOW,
    workflow
});

export const ADD_WORKFLOW_SUCCESS = 'ADD_WORKFLOW_SUCCESS';
export const addWorkflowSuccess = (workflow) => ({
    type: ADD_WORKFLOW_SUCCESS,
    workflow
});

export const DELETE_WORKFLOW = 'DELETE_WORKFLOW';
export const deleteWorkflow = (id) => ({
    type: DELETE_WORKFLOW,
    id
});

export const fetchWorkflow = () => dispatch => {
   dispatch(fetchWorkflowRequest());
   const getReq = `${API_BASE_URL}/workflows`;
   console.log(getReq, "get req")
    fetch(getReq)
        .then(res =>
            res.json())
        .then(workflows => dispatch(fetchWorkflowSuccess(workflows)))
        .catch(err => {

            dispatch(fetchWorkflowError(err))
        })
}


export const addWorkflowForm = ({ title, workflowId }) => dispatch => {
  return fetch(`${API_BASE_URL}/workflows`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title
    })
  })
  .then(res => {
    if (!res.ok) {
      if (
        res.headers.has('content-type') &&
        res.headers.get('content-type').startsWith('application/json')
      ) {
        return res.json().then(err => Promise.reject(err));
      }
      return Promise.reject({
        code: res.status,
        message: res.statusText
      });
    }
    return res.json();
  })
  .then((json) => {

    return dispatch(addWorkflowSuccess(json))})
  .catch(err => {
    const { reason, message, location } = err;
    if (reason === 'Validation Error') {
      return Promise.reject(
        new SubmissionError({
          [location]: message
        })
      );
    }
      return Promise.reject(
        new SubmissionError({
          _error: 'Error submitting task'
        })
      );
  })
}

export const deleteWorkflowForm = (id) => dispatch => {

  return fetch(`${API_BASE_URL}/workflows/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return dispatch(deleteWorkflow(id));
  });
};
