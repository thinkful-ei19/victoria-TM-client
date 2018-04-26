import { API_BASE_URL } from '../config'

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

export const fetchTask = () => dispatch => {
  console.log('fetchtas was called')
   dispatch(fetchTaskRequest());

    fetch(`${API_BASE_URL}/tasks`)
        .then(res =>
            res.json())
        .then(tasks => dispatch(fetchTaskSuccess(tasks)))
        .catch(err => {
            console.log(err);
            dispatch(fetchTaskError(err))
})
}
