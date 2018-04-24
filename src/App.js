import React, { Component } from 'react';
import TaskList from './components/task-list';
import { connect } from 'react-redux';
import { fetchTask } from './actions/action.js';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(fetchTask());
  }
  render() {
    return (
      <div className="App">
        <TaskList />
      </div>
    );
  }
}

export default connect()(App);
