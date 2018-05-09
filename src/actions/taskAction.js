import { API_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form'

export const ADD_TASK = 'ADD_TASK';
export const addTask = (id) => ({
    type: ADD_TASK,
    id
});

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const addTaskSuccess = (task) => {
  return ({
    type: ADD_TASK_SUCCESS,
    task
})};

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (id) => ({
    type: DELETE_TASK,
    id
});

export const addTaskForm = ({ title, content, due, workflowId }) => dispatch => {
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
  .then((json) => dispatch(addTaskSuccess(json)))
  .catch(err => {
    console.log(err, 'Error')
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

export const deleteTaskForm = ({id, workflowId}) => dispatch => {
  return fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return dispatch(deleteTask({id, workflowId}));
  });
};
