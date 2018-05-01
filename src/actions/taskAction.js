import { API_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form'

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (id) => ({
    type: DELETE_TASK,
    id
});

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

// export const TASK_TO_WORKFLOW = 'TASK_TO_WORKFLOW';
// export const taskToWorkflow = (task) => ({
//     type: TASK_TO_WORKFLOW,
//     task
// });

// export const addCommentForm = ({ commentBody, taskId }) => dispatch => {
//   return fetch(`${API_BASE_URL}/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       commentBody,
//       taskId
//     })
//   })
//   .then(res => {
//     if (!res.ok) {
//       if (
//         res.headers.has('content-type') &&
//         res.headers.get('content-type').startsWith('application/json')
//       ) {
//         return res.json().then(err => Promise.reject(err));
//       }
//       return Promise.reject({
//         code: res.status,
//         message: res.statusText
//       });
//     }
//     return;
//   })
//   .then(() => this.props.dispatch(fetchComment()))
//   .then(() => this.props.reset())
//   .catch(err => {
//     const { reason, message, location } = err;
//     if (reason === 'Validation Error') {
//       return Promise.reject(
//         new SubmissionError({
//           [location]: message
//         })
//
//
//       );
//     }
//       return Promise.reject(
//         new SubmissionError({
//           _error: 'Error submitting task'
//         })
//       );
//   })
// }
//
export const deleteTaskForm = ({taskId, workflowId}) => dispatch => {
  console.log(taskId, 'task', workflowId, "WFID" )
  return fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return dispatch(deleteTask({taskId, workflowId}));
  });
};
