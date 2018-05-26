import { connect } from 'react-redux'
import ProposeForm from './ProposeForm'
import { proposeTask } from './ProposeFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProposeFormSubmit: (title, content) => {
      event.preventDefault();

      dispatch(proposeTask(title, content))
    }
  }
}

const ProposeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposeForm)

export default ProposeFormContainer