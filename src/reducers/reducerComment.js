// import {
//   FETCH_COMMENT_REQUEST,
//   FETCH_COMMENT_SUCCESS,
//   FETCH_COMMENT_ERROR
// } from '../actions/commentAction';
//
// const initialState = {
//     comments: [],
//     loading: false,
//     error: null
// };
//
// export function commentReducer(state = initialState, action) {
//     if(action.type === FETCH_COMMENT_REQUEST) {
//         return Object.assign({}, state, {loading: true});
//     }
//     if(action.type === FETCH_COMMENT_SUCCESS) {
//         return Object.assign({}, state, {
//             loading: false,
//             error: false,
//             comments: [...state.comments, action.comments]
//         })
//     }
//     if(action.type === FETCH_COMMENT_ERROR) {
//         return Object.assign({}, state, {
//             loading: false,
//             error: action.error
//         } )
//     }
//
// return state;
// }
