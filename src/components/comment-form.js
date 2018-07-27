import React, { Component } from 'react';

export default class CommentForm extends Component {
  handleSubmit(e){
    const newObj = {
      commentBody: e.target.commentInput.value,
      workflowId: this.props.workflowId,
      taskId: this.props.taskId
    }
    this.props.passAddCommentProps(newObj)
    e.target.commentInput.value = '';
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.commentForm) {
      const value = this.input.value;
      this.props.commentForm(value);
    }
    this.input.value = '';
    this.input.focus();
  }

  render() {
    return (
      <form onSubmit={(e)=>{
        e.preventDefault();
        this.handleSubmit(e)}}>
        <input
          type="text"
          name="commentInput"
          placeholder="Add comment"
          ref={input => (this.input = input)}
          required
        />
        <button

          type="submit"
          name="submit"
          id="commentButton"
        >
          Submit
        </button>
      </form>
    )
  }
}
