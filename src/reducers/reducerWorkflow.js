import {
  FETCH_WORKFLOW_REQUEST,
  FETCH_WORKFLOW_SUCCESS,
  FETCH_WORKFLOW_ERROR,
  ADD_TASK,
  ADD_WORKFLOW
} from '../actions/workflowAction';

import {
  TASK_TO_WORKFLOW
} from '../actions/taskAction';

const initialState = {
    workflows: [],
    showTaskForm: false,
    showWorkflowForm: false,
    loading: false,
    error: null
};

export function workflowReducer(state = initialState, action) {
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
    if (action.type === ADD_TASK) {
        return Object.assign({}, state, {
          showTaskForm: true
        })
    }
    if(action.type === TASK_TO_WORKFLOW) {
        return Object.assign({}, state, {
            workflows: state.workflows.map(workflow => {
              if(action.task.workflow.id === workflow.id){
                workflow.tasks =   [...workflow.tasks, action.task.task.id]
              }
              return workflow
            }),
            showTaskForm: false
        })
    }


return state;
}
