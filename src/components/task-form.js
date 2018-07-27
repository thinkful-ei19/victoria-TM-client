import React, { Component } from 'react';

export default class TaskForm extends Component {

  handleSubmit(e){
    const newObj = {
      title: e.target.titleInput.value,
      content: e.target.contentInput.value,
      due: e.target.dueInput.value
    }
    this.props.passAddTaskProps(newObj)
    e.target.titleInput.value = '';
    e.target.contentInput.value = '';
    e.target.dueInput.value = '';
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.taskForm) {
      const value = this.input.value;
      this.props.taskForm(value);
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
          placeholder="Task Name"
          ref={input => (this.input = input)}
          required
        />
        <input
          type="text"
          name="contentInput"
          placeholder="Describe your task"
          ref={input => (this.input = input)}
          required
        />
        <input type="date" name="dueInput" required />
        <button
          className="buttonStyle"
          type="submit"
          name="submit"
          id="taskButton"
        >
          Submit
        </button>
      </form>
    )
  }
}
