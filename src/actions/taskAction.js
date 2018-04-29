import { API_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form'
import { fetchComment } from './commentAction'

export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST'
export const fetchTaskRequest = () => ({
    type: FETCH_TASK_REQUEST
});

export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS'
export const fetchTaskSuccess = (tasks) => ({
    type: FETCH_TASK_SUCCESS,
    tasks
});

export const FETCH_TASK_ERROR = 'FETCH_TASK_ERROR'
export const fetchTaskError = (error) => ({
    type: FETCH_TASK_ERROR,
    error
});

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

export const fetchTask = (id) => dispatch => {
   dispatch(fetchTaskRequest(id));

    fetch(`${API_BASE_URL}/tasks/${id}`)
        .then(res => {
         if(res.status === 200) return res.json()
        })
        .then(tasks => {
          if(tasks) dispatch(fetchTaskSuccess(tasks))
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchTaskError(err))
})
}

export const addCommentForm = ({ commentBody, taskId }) => dispatch => {
  return fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      commentBody,
      taskId
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
  .then(() => this.props.dispatch(fetchComment()))
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
