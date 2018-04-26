import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkflow } from '../actions/workflowAction'
import TaskList from './task-list'
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
    workflows: state.workflow.workflows
})

export default connect(mapStateToProps)(WorkflowList);
