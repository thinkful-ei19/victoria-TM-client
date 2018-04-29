import { API_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form'
import { fetchTask } from './taskAction'

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

export const ADD_TASK = 'ADD_TASK';
export const addTask = (task) => ({
    type: ADD_TASK,
    task
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

export const addTaskForm = ({ title, content, due, workflowId }) => dispatch => {
  console.log({ title, content, due, workflowId })
  return fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      content,
      due,
      workflowId
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
    return;
  })
  .then(() => this.props.dispatch(fetchTask()))
  .then(() => this.props.reset())
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
