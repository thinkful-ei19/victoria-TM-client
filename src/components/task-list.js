import React from 'react'
import { connect } from 'react-redux'
import { fetchTask, addComment, addCommentForm, deleteTaskForm } from '../actions/taskAction'
import CommentList from './comment-list'
import Form from './comment-form'
import './task.css'

class TaskList extends React.Component {
  componentDidMount(){
    this.props.taskArr.forEach(id => this.props.dispatch(fetchTask(id)))
  }
  render() {
    const myTasks = this.props.tasks.tasks.filter(x => this.props.taskArr.includes(x.id))
    const taskList = myTasks.map((task, index) => {
    const {title, content, comment, due, id } = task
      return(
          <div key={id} className="Task">
            <button onClick={() => this.props.dispatch(deleteTaskForm(id))}>Delete Task</button>
            <h2 calss="TaskName">{title}</h2>
            <section className="TaskContent">{content}</section>
            <CommentList commentArr={comment} />
            <li className="Due">{due}</li>
            <button onClick={() => this.props.dispatch(addComment())}>Add comment</button>
            {(this.props.showCommentForm ? <Form passProps={(o)=>this.props.dispatch(addCommentForm({...o, taskId: id}))} /> : null)}
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
    tasks: state.task,
    showCommentForm: state.task.showCommentForm
})

export default connect(mapStateToProps)(TaskList);
