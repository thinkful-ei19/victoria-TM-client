import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkflow } from '../actions/workflowAction'
import TaskList from './task-list'

class WorkflowList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchWorkflow());
  }
  render() {

    const workflowList = this.props.workflows.map((workflow, index) => {
console.log(workflow)
      const {title, tasks, id } = workflow

      return(
          <div key={id}>
            <h2>{title}</h2>
            <TaskList taskArr={tasks} />
          </div>
      )
    })
    console.log(workflowList, "workflowlist")
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
