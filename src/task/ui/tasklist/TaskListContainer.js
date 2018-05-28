import { connect } from 'react-redux'
import TaskList from './TaskList'
import { getTasks } from './TaskListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    // tasks: state.task.data.taskList
    tasks: [{
      proposer: '', // member who proposed the task 
      title: 'test passing props', // task name
      content: '', // task detail
      voteCount: 0, // number of accumulated votes
      nonconsensus: false, // bool to signal that someone voted no
      finished: false // bool to signal voting has finished
    },{
      proposer: '', // member who proposed the task 
      title: 'test2', // task name
      content: '', // task detail
      voteCount: 0, // number of accumulated votes
      nonconsensus: false, // bool to signal that someone voted no
      finished: false // bool to signal voting has finished
    }]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTaskList: () => {
      event.preventDefault();

      dispatch(getTasks())
    }
  }
}

const TaskListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default TaskListContainer