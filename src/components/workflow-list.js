import React from 'react'
import { connect } from 'react-redux'
import {
  fetchWorkflow,
  addWorkflowForm,
  addWorkflow,
  deleteWorkflowForm
  } from '../actions/workflowAction'
import {
  addTask,
  addTaskForm
} from '../actions/taskAction'
import TaskList from './task-list'
import TaskForm from './task-form'
import WorkflowForm from './workflow-form'
import './workflow.css';

class WorkflowList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchWorkflow());
  }

  render() {
    const workflowList = this.props.workflows.map((workflow, index) => {
      const {title, tasks, id } = workflow

      return(
          <div key={id} className="Workflow">
            <button onClick={() => this.props.dispatch(deleteWorkflowForm(id))}>Delete Workflow</button>
            <h1 className="WorkflowTitle">{title}</h1>
            <TaskList
              taskArr={tasks}
              workflowId={id}
              />
            <button onClick={() => this.props.dispatch(addTask(id))}>New Task</button>
              {(this.props.showTaskForm === id ? <TaskForm passAddTaskProps={(o)=>this.props.dispatch(addTaskForm({...o, workflowId: id}))} /> : null)}
          </div>
      )
    })

    return (
      <div>
          <button className="buttonNav" onClick={() => this.props.dispatch(addWorkflow())}>New Workflow</button>
          {(this.props.showWorkflowForm ? <WorkflowForm passAddTaskProps={(o)=>this.props.dispatch(addWorkflowForm(o))} /> : null)}
          <ul>
          {workflowList}
          </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    workflows: state.workflow.workflows,
    showTaskForm: state.workflow.showTaskForm,
    showCommentForm: state.workflow.showCommentForm,
    showWorkflowForm: state.workflow.showWorkflowForm
})

export default connect(mapStateToProps)(WorkflowList);
