let initialState = {
  array: []
}

const QueuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_GET_ALL_DONE':
      return {...state, array: action.payload.getAll}
    default:
      return state
  }
}

export default QueuesReducer