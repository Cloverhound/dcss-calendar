let initialState = {
  id: 0,
  message: {type: "", content: ""},
  loading: false,
  toQueues: false
}

const queueReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_QUEUE_FROM_SERVER_SUCCEEDED':
      return getQueueFromServerSucceeded(state, action.payload)
    case 'GET_QUEUE_FROM_SERVER_FAILED':
    return getQueueFromServerFailed(state, action.payload)
    case 'SUBMIT_NEW_QUEUE_TO_SERVER_SUCCEEDED':
      return handleSubmitNewQueueToServerSucceeded(state)
    case 'SUBMIT_NEW_QUEUE_TO_SERVER_FAILED':
      return handleSubmitNewQueueToServerFailed(state, action.payload)
    case "SUBMIT_UPDATE_QUEUE_TO_SERVER_SUCCEEDED":
      return handleSubmitUpdateQueueToServerSucceeded(state)
    case "SUBMIT_UPDATE_QUEUE_TO_SERVER_FAILED":
      return handleSubmitUpdateQueueToServerFailed(state, action.payload)
    case "CHANGE_QUEUE":
      return changeQueue(state, action.payload)
    case "QUEUE_LOADING":
      return handleQueueLoading(state)
    case "HANDLE_CLOSE_MESSAGE":
      return handleCloseMessage(state)
    case 'RESET_QUEUE_STATE':
      return resetQueueState()
    default:
      return state
  }
}

const resetQueueState = () => {
  return {...initialState}
}

const changeQueue = (state, payload) => {
  console.log('Changing queue', payload)
  return {...state, [payload.name]: payload.value }
}

const handleCloseMessage = (state) => {
  let message = {type: "", content: ""} 
  return {...state, message}
}

const handleQueueLoading = (state) => {
  console.log('Handle queue loading')
  let loading = true
  return {...state, loading}
}

const handleSubmitNewQueueToServerSucceeded = (state) => {
  console.log('Handling new queue succeeded')
  let loading = false
  let toQueues = true
  return {...state, loading, toQueues}
}

const handleSubmitNewQueueToServerFailed = (state, payload) => {
  console.log('Handling new queue failed', payload)
  let message = {type: "error", content: "Failed to create: " + payload.message}
  let loading = false
  return {...state, message, loading}
}

const handleSubmitUpdateQueueToServerSucceeded = (state) => {
  console.log('Handling update queue succeeded')
  let message = {type: "success", content: "Successfully updated."}
  let loading = false
  return {...state, message, loading}
}

const handleSubmitUpdateQueueToServerFailed = (state, payload) => {
  console.log('andling update queue failed', payload)
  let message = {type: "error", content: "Failed to update: " + payload.message}
  let loading = false
  return {...state, message, loading}
}

const getQueueFromServerSucceeded = (state, payload) => {
  console.log('Handling get queue from server succeeded', payload)
  let id = payload.id
  let queueName = payload.name
  let scheduleId = payload.scheduleId
  let holidayListId = payload.holidayListId
  let loading = false

  return {...state, id, queueName, scheduleId, holidayListId, loading}
}

const getQueueFromServerFailed = (state, payload) => {
  console.log('Handling get queue from server failed', payload)
  return state
}
export default queueReducer