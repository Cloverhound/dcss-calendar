let initialState = {
  lcsas: [],
  lcsa_id: null,
  message: {type: "", content: ""},
  loading: false,
  lcsaToDeleteId: null
}

const lcsasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LCSA':
      return changeLcsa(state, action.payload)
    case 'GET_LCSAS_FROM_SERVER_SUCCEEDED':
      return handleGetLcsasFromServerSucceeded(state, action.payload)
    case 'GET_LCSAS_FROM_SERVER_FAILED':
      return handleGetLcsasFromServerFailed(state, action.payload)
    case 'SUBMIT_NEW_LCSA_TO_SERVER_SUCCEEDED':
      return submitNewLcsaToServerSucceeded(state)
    case 'SUBMIT_NEW_LCSA_TO_SERVER_FAILED':
      return submitNewLcsaToServerFailed(state, action.payload)
    case 'HANDLE_DELETE_LCSA_CLICKED':
      return handleDeleteLcsaClicked(state, action.payload)
    case 'HANDLE_DELETE_LCSA_CANCEL':
      return handleDeleteLcsaCancel(state)
    case 'SUBMIT_DELETE_LCSA_TO_SERVER':
      return handleSubmitDeleteLcsaToServer(state, action.payload)
    case 'SUBMIT_DELETE_LCSA_TO_SERVER_SUCCEEDED':
      return handleSubmitDeleteLcsaToServerSucceeded(state, action.payload)
    case 'SUBMIT_DELETE_LCSA_TO_SERVER_FAILED':
      return handleSubmitDeleteLcsaToServerFailed(state, action.payload)
    case "SUBMIT_LCSA_TOGGLE_TO_SERVER_SUCCEEDED":
      return handleSubmitLcsaToggleToServerSucceeded(state, action.payload)
    case "SUBMIT_LCSA_TOGGLE_TO_SERVER_FAILED":
      return handleSubmitLcsaToggleToServerFailed(state, action.payload)
    case 'HANDLE_CLOSE_MESSAGE':
      return handleCloseMessage(state)
    case 'HANDLE_RESET_LCSA':
      return handleResetLcsa(state)
    case "LCSA_LOADING":
      return handleLcsaLoading(state)
    default:
      return state
  }
}

const handleGetLcsasFromServerSucceeded = (state, payload) => {
  console.log('Handling get lcsas from server succeeded', payload)
  let loading = false
  return { ...state, loading, lcsas: payload }
}

const handleGetLcsasFromServerFailed = (state, payload) => {
  console.log('Handling Get Lcsas From Server failed', payload)
  let message = {type: "error", content: "Failed to get lcsas from server: " + payload.message }
  return { ...state, message}
}

const submitNewLcsaToServerSucceeded = (state) => {
  console.log('Handling new lcsa succeeded')
  let message = {type: "success", content: "Successfully created lcsa."}
  let loading = false
  return {...state, loading, message}
}

const submitNewLcsaToServerFailed = (state, payload) => {
  console.log('Handling new lcsa failed', payload)
  let message = {type: "error", content: "Failed to create: " + payload.error.message}
  let loading = false
  return {...state, message, loading}
}

const handleDeleteLcsaClicked = (state, payload) => {
  console.log('Handling delete lcsa clicked', payload)

  let lcsaToDeleteId = payload.id
  return {...state, lcsaToDeleteId}
}

const handleDeleteLcsaCancel = (state) => {
  console.log('Handling cancel delete lcsa')

  let lcsaToDeleteId = null
  return {...state, lcsaToDeleteId}
}

const handleSubmitDeleteLcsaToServer = (state, payload) => {
  console.log('Handling submit delete lcsa to server', payload)

  let lcsaToDeleteId = null
  return {...state, lcsaToDeleteId}
}

const handleSubmitDeleteLcsaToServerSucceeded = (state, payload) => {
  console.log('Handling submit delete lcsa to server succeeded', payload)
  let message = {type: "success", content: "Successfully deleted lcsa."}
  let loading = false
  return {...state, message, loading}
}

const handleSubmitDeleteLcsaToServerFailed = (state, payload) => {
  console.log('Handling submit delete lcsa to server failed')
  let message = {type: "error", content: "Failed to delete lcsa: " + payload.message}
  let loading = false
  return {...state, message, loading}
}

const handleSubmitLcsaToggleToServerSucceeded = (state, payload) => {
  console.log('Handling update Lcsa Toggle Succeeded', payload)
  let message = {type: "success", content: "Successfully toggled lcsa."}
  let loading = false
  return {...state, message, loading}
}

const handleSubmitLcsaToggleToServerFailed = (state, payload) => {
  console.log('Handling update Lcsa Toggle Failed', payload)
  let message = {type: "error", content: "Failed to toggle lcsa."}
  let loading = false
  return {...state, message, loading}
}

const changeLcsa = (state, payload) => {
  console.log('Changing Lcsa', payload)
  return {...state, [payload.name]: payload.value }
}

const handleCloseMessage = (state) => {
  let message = {type: "", content: ""} 
  return {...state, message}
}

const handleResetLcsa = (state) => {
  console.log('Resetting Lcsa')
  return {...state, lcsa_id: null }
}

const handleLcsaLoading = (state) => {
  console.log('Handle lcsa loading')
  let loading = true
  return {...state, loading}
}

export default lcsasReducer