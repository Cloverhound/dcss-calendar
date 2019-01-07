let initialState = {
  scheduleToDeleteID: null,
  schedules: []
}


const schedulesReducer = (state: any = initialState, action) => {
  switch (action.type) {
    case 'RESET_SCHEDULES_TO_DELETE_ID':
      return resetSchedulesToDeleteId(state, action.payload)
    case 'HANDLE_DELETE_SCHEDULE_CANCEL':
      return handleDeleteScheduleCancel(state)
    case 'HANDLE_DELETE_SCHEDULE_CLICKED':
      return handleDeleteScheduleClicked(state, action.payload)
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

const resetSchedulesToDeleteId = (state, payload) => {
  console.log('Handling submit delete schedule to server', payload)

  let scheduleToDeleteID = null
  return {...state, scheduleToDeleteID}
}

const handleDeleteScheduleCancel = (state) => {
  console.log('Handling cancel delete schedule')

  let scheduleToDeleteID = null
  return {...state, scheduleToDeleteID}
}

const handleDeleteScheduleClicked = (state, payload) => {
  console.log('Handling delete schedule clicked', payload)

  let scheduleToDeleteID = payload.id
  return {...state, scheduleToDeleteID}
}

function handleGetSchedulesFromServerSucceeded(state, payload) {
  console.log('Handling get schedules from server succeeded', payload)
  
  return { ...state, schedules: payload }
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
  let message = {type: "", content: ""} 
  return {...state, message}
}

export default schedulesReducer