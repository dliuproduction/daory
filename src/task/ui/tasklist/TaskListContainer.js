import { connect } from 'react-redux'
import TaskList from './TaskList'
import { retrieveTasks } from './TaskListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    proposedList: state.task.proposedList,
    approvedList: state.task.approvedList,
    disapprovedList: state.task.disapprovedList
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