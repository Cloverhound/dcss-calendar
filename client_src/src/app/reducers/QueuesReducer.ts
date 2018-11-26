let initialState = {
  selected: {},
  array: []
}

const queuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_QUEUES_FROM_SERVER_DONE':
      return { ...state, array: action.payload.getAll }
    default:
      return state
  }
}

export default queuesReducer