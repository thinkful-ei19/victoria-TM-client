import React from 'react'
import { connect } from 'react-redux'
import { deleteCommentForm } from '../actions/commentAction'
import './comment.css'

class CommentList extends React.Component {

  render() {
    const workflowId = this.props.workflowId
    const taskId = this.props.taskId
    const commentList = this.props.commentArr.map((comment, index) => {
      const {commentBody, id} = comment
      return(
          <div key={id} className="Comment">
              <button onClick={() => this.props.dispatch(deleteCommentForm({id, taskId, workflowId}))}>Delete Com</button>
            <li>{commentBody}</li>
          </div>
      )
    })
  return (
    <div>
    {commentList}
    </div>
  )
}
}

const mapStateToProps = (state) => ({
    comments: state.comment
})

export default connect(mapStateToProps)(CommentList);
