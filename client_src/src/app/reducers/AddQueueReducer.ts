let initialState = {
  queueName: '',
  scheduleId: 0,
  holidayID: 0,
}

const addQueueReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ADD_QUEUE_STATE':
      return {...state, [action.payload.name]: action.payload.value }

    case "REQUEST_ADD_QUEUE_DONE":
      return {...state, queueName: '', scheduleId: 0, holidayID: 0,}
    default:
      return state
  }
}

export default addQueueReducer