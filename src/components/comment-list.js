import React from 'react'
import { connect } from 'react-redux'
import './comment.css'

class CommentList extends React.Component {

  render() {
    const commentList = this.props.commentArr.map((comment, index) => {
      const {commentBody, id} = comment
      return(
          <div key={id} className="Comment">
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
