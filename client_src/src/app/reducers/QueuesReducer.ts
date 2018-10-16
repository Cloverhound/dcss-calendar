let initialState = {
  selected: {},
  array: []
}

const queuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_GET_QUEUES_DONE':
      return { ...state, array: action.payload.getAll }
    case 'ADD_SELECTED_QUEUE':
      return { ...state, selected: action.payload }
    case 'CLEAR_SELECTED_QUEUE':
      return { ...state, selected: {} }
    default:
      return state
  }
}

export default queuesReducer