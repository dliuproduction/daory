import { connect } from 'react-redux'
import TaskList from './TaskList'
import { getTasks } from './TaskListActions'

const mapStateToProps = (state, ownProps) => {
  return {
    // tasks: state.task.tasks
    tasks: [{
      proposer: '0x678cbbd9be694d05ef5c0b8092399c03599c26bb', // member who proposed the task 
      title: 'test passing props', // task name
      content: 'content1', // task detail
      voteCount: 0, // number of accumulated votes
      nonconsensus: false, // bool to signal that someone voted no
      finished: false // bool to signal voting has finished
    },{
      proposer: '0x0000000000000000000000000000000000000000',  
      title: 'test approved', 
      content: 'content2', 
      voteCount: 0, 
      nonconsensus: false,
      finished: true 
    },{
      proposer: '0x0000000000000000000000000000000000000000',
      title: 'test disapproved', 
      content: 'content3', 
      voteCount: 0, 
      nonconsensus: true, 
      finished: true 
    }]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTasks: () => {
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