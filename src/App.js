import React, { Component } from 'react';
import WorkflowList from './components/workflow-list';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div>
        <div className="topnav">TaskMe</div>
        <WorkflowList />
      </div>
    );
  }
}

export default connect()(App);
