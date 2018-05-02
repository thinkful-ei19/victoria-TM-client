import { API_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form'

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = (id) => ({
    type: ADD_COMMENT,
    id
});

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const addCommentSuccess = (comment) => {
  return ({
    type: ADD_COMMENT_SUCCESS,
    comment
})};

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
});

export const addCommentForm = ({ commentBody, taskId, workflowId }) => dispatch => {
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
    return res.json();
  })
  .then((json) => {

    return dispatch(addCommentSuccess({json, taskId, workflowId}))})
  .catch(err => {
    console.log(err)
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

export const deleteCommentForm = ({id, taskId, workflowId}) => dispatch => {
  return fetch(`${API_BASE_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return dispatch(deleteComment({id, taskId, workflowId}));
  });
};
