let initialState = {schedules: []}


const schedulesReducer = (state: any = initialState, action) => {
  switch (action.type) {
    case 'GET_SCHEDULES_FROM_SERVER_SUCCEEDED':
      return handleGetSchedulesFromServerSucceeded(state, action.payload)
    case 'GET_SCHEDULES_FROM_SERVER_FAILED':
      return handleGetSchedulesFromServerFailed(state, action.payload)
    case 'SUBMIT_DELETE_SCHEDULE_TO_SERVER_SUCCEEDED':
      return handleSubmitDeleteScheduleToServerSucceeded(state, action.payload)
    case 'SUBMIT_DELETE_SCHEDULE_TO_SERVER_FAILED':
      return handleSubmitDeleteScheduleToServerFailed(state, action.payload)
    case 'HANDLE_CLOSE_MESSAGE':
      return handleCloseMessage(state)
    default:
      return state
  }
}

function handleGetSchedulesFromServerSucceeded(state, payload) {
  let schedules = payload.map(schedule => {
    let keys = Object.keys(schedule)
    let newWeek = keys.reduce((acc, key) => {
      if (key === "id") {
        acc[key] = schedule.id
      } else if (key === "name") {
        acc[key] = schedule.name
      } else {
        acc.hours = { ...acc.hours, [key]: schedule[key] }
      }
      return acc
    }, { hours: {} })
    return newWeek
  })

  return { ...state, schedules }
}

function handleGetSchedulesFromServerFailed(state, payload) {
  console.log('Handling getting schedules from server failed')
  return state
}

function handleSubmitDeleteScheduleToServerSucceeded(state, payload) {
  console.log('Handling submit delete schedule to server succeeded')
  return state
}

function handleSubmitDeleteScheduleToServerFailed(state, payload) {
  console.log('Handling submit delete schedule to server failed')
  return state
}

function handleCloseMessage(state) {

}

export default schedulesReducer