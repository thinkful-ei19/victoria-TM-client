import React from 'react'
import { connect } from 'react-redux'
import { deleteTaskForm } from '../actions/taskAction'
import CommentList from './comment-list'
import Form from './comment-form'
import './task.css'

class TaskList extends React.Component {
  render() {
    const taskList = this.props.taskArr.map((task, index) => {

    const {title, content, comment, due, id } = task
      return(
          <div key={id} className="Task">
            <button onClick={() => this.props.passDeleteProps(id)}>Delete Task</button>
            <h2 calss="TaskName">{title}</h2>
            <section className="TaskContent">{content}</section>
            <CommentList commentArr={comment} />
            <li className="Due">{due}</li>
            {/*}<button onClick={() => this.props.dispatch(addComment())}>Add comment</button>
            {(this.props.showCommentForm ? <Form passAddTaskProps={(o)=>this.props.dispatch(addCommentForm({...o, taskId: id}))} /> : null)}*/}
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
    //showCommentForm: state.task.showCommentForm
})

export default connect(mapStateToProps)(TaskList);
