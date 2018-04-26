import React from 'react'
import { connect } from 'react-redux'
import { fetchWorkflow } from '../actions/workflowAction'
import TaskList from './task-list'

class WorkflowList extends React.Component {
  componentDidMount(){
    console.log(this.props.workflows, "#####")
    this.props.dispatch(fetchWorkflow());
  }
  render() {
     console.log(this.props.workflows, "hi Iam working in Workflow");
    const workflowList = this.props.workflows.map((workflow, index) => {
      const {title} = workflow
      return(
          <div key={workflow.id}>
            <h2>{title}</h2>
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
