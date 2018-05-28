const initialState = {
    tasks: []
  }
  
  const taskReducer = (state = initialState, action) => {
    if (action.type === 'TASK_PROPOSED') {
      return Object.assign({}, state, {
        tasks: state.tasks.push(action.payload)
      })
    }  else if (action.type === 'TASKS_RETRIEVED') {
      return Object.assign({}, state, {
        tasks: action.payload
      })
    }
    return state
  }
  
  export default taskReducer
  