import { API_BASE_URL } from '../config'

export const FETCH_COMMENT_REQUEST = 'FETCH_COMMENT_REQUEST'
export const fetchCommentRequest = () => ({
    type: FETCH_COMMENT_REQUEST
});

export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS'
export const fetchCommentSuccess = (comments) => ({
    type: FETCH_COMMENT_SUCCESS,
    comments
});

export const FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR'
export const fetchCommentError = (error) => ({
    type: FETCH_COMMENT_ERROR,
    error
});

export const fetchComment = (id) => dispatch => {
   dispatch(fetchCommentRequest(id));

    fetch(`${API_BASE_URL}/comments/${id}`)
        .then(res => {
         if(res.status === 200) return res.json()
        })
        .then(comments => {
          if(comments) dispatch(fetchCommentSuccess(comments))
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchCommentError(err))
})
}
