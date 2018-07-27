import React from 'react'
import { connect } from 'react-redux'
import { deleteTaskForm } from '../actions/taskAction'
import { addComment, addCommentForm } from '../actions/commentAction'
import CommentList from './comment-list'
import CommentForm from './comment-form'

class TaskList extends React.Component {
  render() {
    const workflowId = this.props.workflowId
    const taskList = this.props.taskArr.map((task, index) => {
    const {title, content, comment, due, id } = task

      return(
          <div key={task.id} className="Task">
            <button  onClick={() => this.props.dispatch(deleteTaskForm({id, workflowId}))}>Delete Task</button>
            <h2 calss="TaskName">{title}</h2>
            <section className="TaskContent">{content}</section>
            <CommentList commentArr={comment} workflowId={workflowId} taskId={id} />
            <li className="Due">{due}</li>
            <button  onClick={() => this.props.dispatch(addComment(id))}>Add comment</button>
            {(this.props.showCommentForm === id ? <CommentForm workflowId={workflowId} taskId={id}
              passAddCommentProps={(o)=>this.props.dispatch(addCommentForm({...o, taskId: id, workflowId}))} /> : null)}
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

const mapStateToProps = (state) => {
  return ({
  showCommentForm: state.workflow.showCommentForm
})}

export default connect(mapStateToProps)(TaskList);
