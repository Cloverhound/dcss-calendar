let initialState = {
  queues: [],
  queueToDeleteID: null,
  message: {type: "", content: ""},
  queueToggleForceClosedObj: {id: null, name: null, bool: null},
  queueToggleOptionalPromptsObj: {id: null, name: null, bool: null}
}

const queuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_QUEUES_FROM_SERVER_SUCCEEDED':
      return handleGetQueuesFromServerSucceeded(state, action.payload)
    case 'GET_QUEUES_FROM_SERVER_FAILED':
      return handleGetQueuesFromServerFailed(state, action.payload)
    case 'SUBMIT_DELETE_QUEUE_TO_SERVER':
      return handleSubmitDeleteQueueToServer(state, action.payload)
    case 'SUBMIT_DELETE_QUEUE_TO_SERVER_SUCCEEDED':
      return handleSubmitDeleteQueueToServerSucceeded(state, action.payload)
    case 'SUBMIT_DELETE_QUEUE_TO_SERVER_FAILED':
      return handleSubmitDeleteQueueToServerFailed(state, action.payload)
    case 'HANDLE_DELETE_QUEUE_CLICKED':
      return handleDeleteQueueClicked(state, action.payload)
    case 'HANDLE_DELETE_CANCEL':
      return handleDeleteQueueCancel(state)
    case "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_SUCCEEDED":
      return handleSubmitOptionalPromptsToServerSucceeded(state, action.payload)
    case "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_FAILED":
      return handleSubmitOptionalPromptsToServerFailed(state, action.payload)
    case 'HANDLE_CLOSE_MESSAGE':
      return handleCloseMessage(state)
    case 'HANDLE_TOGGLE_FORCE_CLOSED_CLICKED':
      return handleToggleForceClosedClicked(state, action.payload)
    case 'HANDLE_TOGGLE_QUEUE_FORCE_CLOSED_CANCEL':
      return handleToggleQueueForceClosedCancel(state)
    case "SUBMIT_QUEUE_FORCE_CLOSE_TOGGLE_TO_SERVER_SUCCEEDED":
      return handleSubmitQueueForceCloseToggleToServerSucceeded(state, action.payload)
    case "SUBMIT_QUEUE_FORCE_CLOSE_TOGGLE_TO_SERVER_FAILED":
      return handleSubmitQueueForceCloseToggleToServerFailed(state, action.payload)
    case 'HANDLE_TOGGLE_OPTIONAL_PROMPTS_CLICKED':
      return handleToggleOptionalPromptsClicked(state, action.payload)
    case 'HANDLE_TOGGLE_OPTIONAL_PROMPTS_CANCEL':
      return handleToggleOptionalPromptsCancel(state)
    default:
      return state
  }
}

const handleSubmitDeleteQueueToServer = (state, payload) => {
  console.log('Handling submit delete queue to server', payload)

  let queueToDeleteID = null
  return {...state, queueToDeleteID}
}

const handleDeleteQueueCancel = (state) => {
  console.log('Handling cancel delete queue')

  let queueToDeleteID = null
  return {...state, queueToDeleteID}
}

const handleDeleteQueueClicked = (state, payload) => {
  console.log('Handling delete queue clicked', payload)

  let queueToDeleteID = payload.id
  return {...state, queueToDeleteID}
}

const handleSubmitDeleteQueueToServerSucceeded = (state, payload) => {
  console.log('Handling submit delete queue to server succeeded', payload)
  let message = {type: "success", content: "Successfully deleted queue."}
  let loading = false
  return {...state, message, loading}
}

const handleSubmitDeleteQueueToServerFailed = (state, payload) => {
  console.log('Handling submit delete queue to server failed')
  let message = {type: "error", content: "Failed to delete queue: " + payload.message}
  let loading = false
  return {...state, message, loading}
}

const handleGetQueuesFromServerSucceeded = (state, payload) => {
  console.log('Handling get queues from server succeded', payload)
  return { ...state, queues: payload.counties }
}

const handleGetQueuesFromServerFailed = (state, payload) => {
  console.log('Handling Get Queues From Server failed', payload)
  let message = {type: "error", content: "Failed to get counties from server: " + payload.message }
  return { ...state, message}
}

const handleSubmitOptionalPromptsToServerSucceeded = (state, payload) => {
  console.log('Handling update Optional Prompts Toggle Succeeded', payload)
  let message = {type: "success", content: "Successfully toggled optional prompts."}
  let loading = false
  return {...state, queueToggleOptionalPromptsObj: {...state.queueToggleOptionalPromptsObj, id: null, bool: null}, loading}
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

const handleToggleForceClosedClicked = (state, payload) => {
  console.log('Handling queue toggle force closed clicked', payload)

  let queueToggleForceClosedObj = {id: payload.id, name: payload.name, bool: payload.bool}
  return {...state, queueToggleForceClosedObj}
}

const handleToggleQueueForceClosedCancel = (state) => {
  console.log('Handling cancel lsca toggle bcp active cancel')

  return {...state, queueToggleForceClosedObj: {...state.queueToggleForceClosedObj, id: null, bool: null}}
}

const handleSubmitQueueForceCloseToggleToServerSucceeded = (state, payload) => {
  console.log('Handling update Queue force close Toggle Succeeded', payload)
  let loading = false
  return {...state, loading, queueToggleForceClosedObj: {...state.queueToggleForceClosedObj, id: null, bool: null}}
}

const handleSubmitQueueForceCloseToggleToServerFailed = (state, payload) => {
  console.log('Handling update Queue Force Close Toggle Failed', payload)
  let message = {type: "error", content: "Failed to toggle queue."}
  let loading = false
  return {...state, message, loading}
}

const handleToggleOptionalPromptsClicked = (state, payload) => {
  console.log('Handling queue toggle optional prompts clicked', payload)

  let queueToggleOptionalPromptsObj = {id: payload.id, name: payload.name, bool: payload.bool}
  return {...state, queueToggleOptionalPromptsObj}
}

const handleToggleOptionalPromptsCancel = (state) => {
  console.log('Handling optional prompts toggle cancel')

  return {...state, queueToggleOptionalPromptsObj: {...state.queueToggleOptionalPromptsObj, id: null, bool: null}}
}

export default queuesReducer