import {
  FETCH_WORKFLOW_REQUEST,
  FETCH_WORKFLOW_SUCCESS,
  FETCH_WORKFLOW_ERROR,
  ADD_WORKFLOW,
  ADD_WORKFLOW_SUCCESS,
  DELETE_WORKFLOW
} from '../actions/workflowAction';

import {
  DELETE_TASK,
  ADD_TASK,
  ADD_TASK_SUCCESS
} from '../actions/taskAction';

import {
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT
} from '../actions/commentAction';

const initialState = {
  workflows: [],
  showWorkflowForm: false,
  showTaskForm: false,
  showCommentForm: false,
  loading: false,
  error: null
}

export function workflowsReducer(state = initialState, action) {
    if(action.type === FETCH_WORKFLOW_REQUEST) {
        return Object.assign({}, state, {loading: true});
    }
    if(action.type === FETCH_WORKFLOW_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: false,
            workflows: action.workflows
        })
    }
    if(action.type === FETCH_WORKFLOW_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        } )
    }
    if (action.type === ADD_WORKFLOW) {
        return Object.assign({}, state, {
          showWorkflowForm: true
        })
    }
    if (action.type === ADD_WORKFLOW_SUCCESS) {
      return {
            ...state,
            workflows: [...state.workflows, action.workflow]
        }
    }
    if (action.type === DELETE_WORKFLOW) {
      return Object.assign({}, state, {
        workflows: state.workflows.filter(workflow => workflow.id !== action.id)
      });
    }
    if(action.type === ADD_TASK_SUCCESS){
      return Object.assign({}, state, {showTaskForm: false, workflows: state.workflows.map(workflow => {
        if(action.task.workflow.id === workflow.id){
          return (Object.assign({}, workflow, false, {tasks: [...workflow.tasks, action.task.task]}));
        }
        return workflow
      })})
    }
    if (action.type === ADD_TASK) {
        return Object.assign({}, state, {
          showTaskForm: action.id
        })
    }
    if (action.type === DELETE_TASK) {
      return Object.assign({}, state, {workflows: state.workflows.map(workflow => {
        if(action.id.workflowId === workflow.id){
          return Object.assign({}, workflow, {tasks: workflow.tasks.filter(task => task.id !== action.id.id)});
        }
        return workflow;
      })})
    }
    if(action.type === ADD_COMMENT_SUCCESS){
      return Object.assign({}, state, {showCommentForm: false, workflows: state.workflows.map(workflow => {
        if(action.comment.workflowId === workflow.id){
          return Object.assign({}, workflow, {tasks: workflow.tasks.map(task => {
            if(action.comment.taskId === task.id){
              return Object.assign({}, task, {comment: [...task.comment, action.comment.json.comment]})
            }
            return task;
          })});
        }
        return workflow;
      })});
    }
    if (action.type === ADD_COMMENT) {
        return Object.assign({}, state, {
          showCommentForm: action.id
        })
    }
    if (action.type === DELETE_COMMENT) {
      console.log(action)
      return Object.assign({}, state, {workflows: state.workflows.map(workflow => {
        if(action.id.workflowId === workflow.id){
          return Object.assign({}, workflow, {tasks: workflow.tasks.map(task => {
            if(action.id.taskId === task.id){
              return Object.assign({}, task, {comment: task.comment.filter(comment => comment.id !== action.id.id)})
            }
            return task;
          })});
        }
        return workflow;
      })});
    }

return state;
}
