import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTask } from '../actions/action'

class TaskList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchTask())
  }

  render() {
     console.log(this.props.tasks, "hi Iam working");
    const taskList = this.props.tasks.map((tasks,index)=>{
      return(
          <li key={index}>
          {tasks}
          </li>
      )
    })
      return (
        <div>
            <ul>
            {taskList}
            </ul>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks
})

export default connect(mapStateToProps)(TaskList);
