import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkflow, addTask, addTaskForm, addWorkflowForm, addWorkflow } from '../actions/workflowAction'
import { deleteTaskForm } from '../actions/taskAction'
import TaskList from './task-list'
import TaskForm from './task-form'
import WorkflowForm from './workflow-form'
import './workflow.css';

class WorkflowList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchWorkflow());
  }

  render() {
    console.log(this.props.workflows, 'WORKFLOWS')
    const workflowList = this.props.workflows.map((workflow, index) => {

      const {title, tasks, id } = workflow

      return(
          <div key={id} className="Workflow">
            <h1 className="WorkflowTitle">{title}</h1>
            <TaskList taskArr={tasks} passDeleteProps={(taskId)=>this.props.dispatch(deleteTaskForm({taskId, workflowId: id}))}/>
            <button onClick={() => this.props.dispatch(addTask())}>New Task</button>
            {(this.props.showTaskForm ? <TaskForm passAddTaskProps={(o)=>this.props.dispatch(addTaskForm({...o, workflowId: id}))} /> : null)}
          </div>
      )
    })

    return (
      <div>
          <ul>
          {workflowList}
          </ul>
          <button onClick={() => this.props.dispatch(addWorkflow())}>New Workflow</button>
          {(this.props.showWorkflowForm ? <WorkflowForm passAddTaskProps={(o)=>this.props.dispatch(addWorkflowForm(o))} /> : null)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    workflows: state.workflow.workflows,
    showTaskForm: state.workflow.showTaskForm,
    showWorkflowForm: state.workflow.showWorkflowForm
})

export default connect(mapStateToProps)(WorkflowList);
