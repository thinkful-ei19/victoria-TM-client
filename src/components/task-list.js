import React from 'react'
import { connect } from 'react-redux'
import { fetchTask } from '../actions/taskAction'
import WorkflowList from './workflow-list'
import CommentList from './comment-list'

class TaskList extends React.Component {
    constructor(props){
      super(props)
    }

  componentDidMount(){
    this.props.taskArr.forEach(id => this.props.dispatch(fetchTask(id)))
  }
  render() {
    const myTasks = this.props.tasks.tasks.filter(x => this.props.taskArr.includes(x.id))
    const taskList = myTasks.map((task, index) => {
    const {title, content, comment, due } = task
    console.log(task)
      return(
          <div key={task.id}>
            <h2>{title}</h2>
            <section>{content}</section>
            <CommentList commentArr={comment} />
            <li>{due}</li>
          </div>
      )
    })
  return (
    <div>
    {taskList}
    </div>
  )
}
}

const mapStateToProps = (state) => ({
    tasks: state.task
})

export default connect(mapStateToProps)(TaskList);
