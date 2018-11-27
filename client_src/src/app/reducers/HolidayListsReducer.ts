const initialState = {
  holidayLists: []
}
  
const holidayListsReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_HOLIDAY_LISTS_FROM_SERVER_SUCCEEDED':
      return handleGetHolidayListsFromServerSucceeded(state, action.payload)
    case 'GET_HOLIDAY_LISTS_FROM_SERVER_FAILED':
      return handleGetHolidayListsFromServerFailed(state, action.payload)
    case 'SUBMIT_DELETE_HOLIDAY_LIST_TO_SERVER_SUCCEEDED':
      return handleSubmitDeleteHolidayListToServerSucceeded(state, action.payload)
    case 'SUBMIT_DELETE_HOLIDAY_LIST_TO_SERVER_FAILED':
      return handleSubmitDeleteHolidayListToServerFailed(state, action.payload)
    case 'HANDLE_CLOSE_MESSAGE':
      return handleCloseMessage(state)
    // case 'HOLIDAY_LISTS_LOADING':
    //   return handleHolidayListsLoading(state)
    default:
      return state
  }
}

const handleHolidayListsLoading = (state) => {
  console.log('Handle holiday lists loading')
  let loading = true
  return {...state, loading}
}

const handleCloseMessage = (state) => {
  let message = {type: "", content: ""} 
  return {...state, message}
}

const handleSubmitDeleteHolidayListToServerSucceeded = (state, payload) => {
  console.log('Handling submit delete holiday list to server succeeded', payload)
  let holidayLists  = state.holidayLists
  holidayLists = holidayLists.filter(holidayList => holidayList.id != payload.status)
  let loading = false
  return {...state, holidayLists, loading}
}

const handleSubmitDeleteHolidayListToServerFailed = (state, payload) => {
  console.log('Handling submit delete holiday list to server failed', payload)
  let message = {type: "error", content: "Failed to delete holiday list: " + payload.message}
  let loading = false
  return {...state, message, loading}
}

const handleGetHolidayListsFromServerSucceeded = (state, payload) => {
  console.log('Handling get holiday lists from server succeeded', payload)
  let holidayLists = []
  let loadedHolidayLists = payload
  if(loadedHolidayLists && loadedHolidayLists.length > 0 ) {
      holidayLists = loadedHolidayLists
  }
  let loading = false
  return { ...state, holidayLists, loading}
}

const handleGetHolidayListsFromServerFailed = (state, payload) => {
  console.log('Handling get holiday lists failed', payload)
  let message = {type: "error", content: "Failed to get holiday lists: " + payload.message}
  let loading = false
  return {...state, message, loading}
}
  
export default holidayListsReducer