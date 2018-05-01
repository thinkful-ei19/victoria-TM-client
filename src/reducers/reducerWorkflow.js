import {
  FETCH_WORKFLOW_REQUEST,
  FETCH_WORKFLOW_SUCCESS,
  FETCH_WORKFLOW_ERROR,
  ADD_TASK,
  ADD_WORKFLOW,
  ADD_TASK_SUCCESS
} from '../actions/workflowAction';

import {
  DELETE_TASK
} from '../actions/taskAction';

const initialState = {
  workflows: [],
  showWorkflowForm: false,
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
    if(action.type === ADD_TASK_SUCCESS){
      return Object.assign({}, state, {workflows: state.workflows.map(workflow => {
        if(action.task.workflow.id === workflow.id){
          workflow.tasks = [...workflow.tasks, action.task.task];
        }
        return workflow
      })})
    }
    if (action.type === ADD_WORKFLOW) {
        return Object.assign({}, state, {
          showWorkflowForm: true
        })
    }
    if (action.type === ADD_TASK) {
        return Object.assign({}, state, {
          showTaskForm: true
        })
    }
    if (action.type === DELETE_TASK) {
      console.log(action, 'action')
      return Object.assign({}, state, {workflows: state.workflows.map(workflow => {
        if(action.id.workflowId === workflow.id){
          workflow.tasks = workflow.tasks.filter(task => task.id !== action.id.taskId);
        }
        return workflow;
      })})
    }


return state;
}
