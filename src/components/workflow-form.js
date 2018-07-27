import React, { Component } from 'react';

export default class WorkflowForm extends Component {

  handleSubmit(e){
    const newObj = {
      title: e.target.titleInput.value
    }
    this.props.passAddTaskProps(newObj)
    e.target.titleInput.value = '';
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.workflowForm) {
      const value = this.input.value;
      this.props.workflowForm(value);
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
          name="titleInput"
          placeholder="Workflow Name"
          ref={input => (this.input = input)}
          required
        />
        <button
          className="buttonStyle"
          type="submit"
          name="submit"
          id="workflowButton"
        >
          Submit
        </button>
      </form>
    )
  }
}
