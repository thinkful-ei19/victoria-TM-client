import React from 'react'
import { connect } from 'react-redux'
import { fetchTask } from '../actions/taskAction'

class TaskList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchTask());
  }
  render() {
     console.log(this.props.task, "hi Iam working in Task");
    const taskList = this.props.tasks.map((task,index) => {
      const { comment, title, content, due } = task;
      return(
          <div key={task.id}>
            <h2>{title}</h2>
            <section>{content}</section>
            <section>{comment}</section>
            <li>{due}</li>
          </div>
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
    tasks: state.task.tasks
})

export default connect(mapStateToProps)(TaskList);
