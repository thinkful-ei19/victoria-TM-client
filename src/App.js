import React, { Component } from 'react';
import TaskList from './components/task-list';
import WorkflowList from './components/workflow-list';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div className="App">
        <WorkflowList />
      </div>
    );
  }
}

export default connect()(App);
