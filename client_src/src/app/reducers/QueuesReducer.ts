let initialState = {
  array: []
}

const queuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_GET_QUEUES_DONE':
      return {...state, array: action.payload.getAll}
    default:
      return state
  }
}

export default queuesReducer