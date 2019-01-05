let initialState = {
  queues: [],
  reload: false,
  message: {type: "", content: ""}
}

const queuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_QUEUES_FROM_SERVER_SUCCEEDED':
      return handleGetQueuesFromServerSucceeded(state, action.payload)
    case 'GET_QUEUES_FROM_SERVER_FAILED':
      return handleGetQueuesFromServerFailed(state, action.payload)
    case 'SUBMIT_DELETE_QUEUE_TO_SERVER_SUCCEEDED':
      return handleSubmitDeleteQueueToServerSucceeded(state, action.payload)
    case 'SUBMIT_DELETE_QUEUE_TO_SERVER_FAILED':
      return handleSubmitDeleteQueueToServerFailed(state, action.payload)
    case "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_SUCCEEDED":
      return handleSubmitOptionalPromptsToServerSucceeded(state, action.payload)
    case "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_FAILED":
      return handleSubmitOptionalPromptsToServerFailed(state, action.payload)
    case 'HANDLE_CLOSE_MESSAGE':
      return handleCloseMessage(state)
    default:
      return state
  }
}

const handleSubmitDeleteQueueToServerSucceeded = (state, payload) => {
  console.log('Handling submit delete queue to server succeeded', payload)
  let queues  = state.queues
  queues = queues.filter(queue => queue.id != payload.status)
  let loading = false
  let reload = true
  return {...state, queues, loading, reload}
}

const handleSubmitDeleteQueueToServerFailed = (state, payload) => {
  console.log('Handling submit delete queue to server failed')
  let message = {type: "error", content: "Failed to delete queue: " + payload.message}
  let loading = false
  return {...state, message, loading}
}

const handleGetQueuesFromServerSucceeded = (state, payload) => {
  console.log('Handling get queues from server succeded', payload)
  payload.reload = false
  return { ...state, queues: payload }
}

const handleGetQueuesFromServerFailed = (state, payload) => {
  console.log('Handling Get Queues From Server failed', payload)
  return { ...state}
}

const handleSubmitOptionalPromptsToServerSucceeded = (state, payload) => {
  console.log('Handling update Optional Prompts Toggle Succeeded', payload)
  let message = {type: "success", content: "Successfully toggled optional prompts."}
  let loading = false
  return {...state, message, loading}
}

const handleSubmitOptionalPromptsToServerFailed = (state, payload) => {
  console.log('Handling update Optional Prompts Toggle Failed', payload)
  let message = {type: "error", content: "Failed to toggle optional prompts."}
  let loading = false
  return {...state, message, loading}
}

const handleCloseMessage = (state) => {
  let message = {type: "", content: ""} 
  return {...state, message}
}

export default queuesReducer