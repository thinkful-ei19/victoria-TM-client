import React from 'react'
import { connect } from 'react-redux'
import { fetchComment } from '../actions/commentAction'

class CommentList extends React.Component {
  componentDidMount(){
    this.props.commentArr.forEach(id => this.props.dispatch(fetchComment(id)))
  }
  render() {
    const myComments = this.props.comments.comments.filter(x => this.props.commentArr.includes(x.id))
    const commentList = myComments.map((comment, index) => {
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
