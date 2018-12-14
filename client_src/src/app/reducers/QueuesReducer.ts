let initialState = {
  queues: []
}

const queuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_QUEUES_FROM_SERVER_DONE':
      return { ...state, queue: action.payload }
    default:
      return state
  }
}

export default queuesReducer