import { connect } from 'react-redux'
import TaskList from './TaskList'
import { retrieveTasks, watchTasks } from './TaskListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.task.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTasks: (event) => {
      event.preventDefault()

      dispatch(retrieveTasks())
    }
  }
}

const TaskListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default TaskListContainer