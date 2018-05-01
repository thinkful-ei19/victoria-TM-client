import { API_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form'

export const FETCH_WORKFLOW_REQUEST = 'FETCH_WORKFLOW_REQUEST'
export const fetchWorkflowRequest = () => ({
    type: FETCH_WORKFLOW_REQUEST
});

export const FETCH_WORKFLOW_SUCCESS = 'FETCH_WORKFLOW_SUCCESS'
export const fetchWorkflowSuccess = (workflows) => {
  console.log(workflows)
  return ({
    type: FETCH_WORKFLOW_SUCCESS,
    workflows
})};

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

export const ADD_WORKFLOW = 'ADD_WORKFLOW';
export const addWorkflow = (workflow) => ({
    type: ADD_WORKFLOW,
    workflow
});

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const addTaskSuccess = (task) => {
  console.log("im working")
  return ({
    type: ADD_TASK_SUCCESS,
    task
})};

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
  console.log(title, "title")
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

    return res.json();
  })
  .then((json) => {
    console.log(json, 'JSON')
    return dispatch(addTaskSuccess(json))})
  .catch(err => {
    console.log(err, 'ERROR')
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

export const addWorkflowForm = ({ title }) => dispatch => {
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
    return;
  })
  .then(() => this.props.dispatch(fetchWorkflow()))
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
