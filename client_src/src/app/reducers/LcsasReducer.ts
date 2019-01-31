let initialState = {
  lcsas: [],
  lcsa_id: null
  // queueToDeleteID: null,
  // message: {type: "", content: ""}
}

const lcsasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LCSAS_FROM_SERVER_SUCCEEDED':
      return handleGetLcsasFromServerSucceeded(state, action.payload)
    case 'CHANGE_LCSA':
      return changeLcsa(state, action.payload)
    // case 'GET_QUEUES_FROM_SERVER_FAILED':
    //   return handleGetQueuesFromServerFailed(state, action.payload)
    // case 'SUBMIT_DELETE_QUEUE_TO_SERVER':
    //   return handleSubmitDeleteQueueToServer(state, action.payload)
    // case 'SUBMIT_DELETE_QUEUE_TO_SERVER_SUCCEEDED':
    //   return handleSubmitDeleteQueueToServerSucceeded(state, action.payload)
    // case 'SUBMIT_DELETE_QUEUE_TO_SERVER_FAILED':
    //   return handleSubmitDeleteQueueToServerFailed(state, action.payload)
    // case 'HANDLE_DELETE_QUEUE_CLICKED':
    //   return handleDeleteQueueClicked(state, action.payload)
    // case 'HANDLE_DELETE_CANCEL':
    //   return handleDeleteQueueCancel(state)
    // case "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_SUCCEEDED":
    //   return handleSubmitOptionalPromptsToServerSucceeded(state, action.payload)
    // case "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_FAILED":
    //   return handleSubmitOptionalPromptsToServerFailed(state, action.payload)
    // case 'HANDLE_CLOSE_MESSAGE':
    //   return handleCloseMessage(state)
    case 'HANDLE_RESET_LCSA':
      return handleResetLcsa(state)
    default:
      return state
  }
}

const handleGetLcsasFromServerSucceeded = (state, payload) => {
  console.log('Handling get queues from server succeeded', payload)
  return { ...state, lcsas: payload }
}

const changeLcsa = (state, payload) => {
  console.log('Changing Lcsa', payload)
  return {...state, [payload.name]: payload.value }
}

const handleResetLcsa = (state) => {
  console.log('Resetting Lcsa')
  return {...state, lcsa_id: null }
}


export default lcsasReducer