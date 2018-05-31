const initialState = {
    proposedList: [],
    approvedList: [],
    disapprovedList: []
  }
  
  const taskReducer = (state = initialState, action) => {
    if (action.type === 'TASK_PROPOSED') {
      return Object.assign({}, state, {
        proposedList: action.payload.proposedList,
        approvedList: action.payload.approvedList,
        disapprovedList: action.payload.disapprovedList
      })
    }  else if (action.type === 'TASKS_RETRIEVED') {
      return Object.assign({}, state, {
        proposedList: action.payload.proposedList,
        approvedList: action.payload.approvedList,
        disapprovedList: action.payload.disapprovedList
      })
    }
    return state
  }
  
  export default taskReducer
  