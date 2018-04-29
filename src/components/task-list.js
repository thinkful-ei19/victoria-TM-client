import React from 'react'
import { connect } from 'react-redux'
import { fetchTask } from '../actions/taskAction'
import CommentList from './comment-list'
import './task.css'

class TaskList extends React.Component {
  componentDidMount(){
    this.props.taskArr.forEach(id => this.props.dispatch(fetchTask(id)))
  }
  render() {
    const myTasks = this.props.tasks.tasks.filter(x => this.props.taskArr.includes(x.id))
    const taskList = myTasks.map((task, index) => {
    const {title, content, comment, due } = task
      return(
          <div key={task.id} className="Task">
            <h2 calss="TaskName">{title}</h2>
            <section className="TaskContent">{content}</section>
            <CommentList commentArr={comment} />
            <li className="Due">{due}</li>
          </div>
      )
    })
  return (
    <div>
    {taskList}
    </div>
  )
}
}

const mapStateToProps = (state) => ({
    tasks: state.task
})

export default connect(mapStateToProps)(TaskList);
