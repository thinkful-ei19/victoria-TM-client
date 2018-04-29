import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkflow, addTask, addTaskForm } from '../actions/workflowAction'
import TaskList from './task-list'
import Form from './task-form'
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
            <h1 className="WorkflowTitle">{title}</h1>
            <TaskList taskArr={tasks} />
            <button onClick={() => this.props.dispatch(addTask())}>New Task</button>
            {(this.props.showTaskForm ? <Form passProps={(o)=>this.props.dispatch(addTaskForm({...o, workflowId: id}))} /> : null)}
          </div>
      )
    })

    return (
      <div>
          <ul>
          {workflowList}
          </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    workflows: state.workflow.workflows,
    showTaskForm: state.workflow.showTaskForm
})

export default connect(mapStateToProps)(WorkflowList);
