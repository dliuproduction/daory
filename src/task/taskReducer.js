const initialState = {
    data: null
  }
  
  const taskReducer = (state = initialState, action) => {
    if (action.type === 'TASK_PROPOSED')
    {
      return Object.assign({}, state, {
        data: action.payload
      })
    }
    return state
  }
  
  export default taskReducer
  