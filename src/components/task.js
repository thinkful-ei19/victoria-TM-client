import React from 'react'
import WorkflowList from './workflow-list'
import TaskList from './task-list'

export default function Task(props) {
  
  const tasks = props.tasks.map(taskId =>
    <div>
      <TaskList id={taskId} />
    </div>);
  return(
  null
  );
}
