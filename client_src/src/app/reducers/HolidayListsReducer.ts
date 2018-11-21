const initialState = {
  holidayLists: []
}
  
const holidayListsReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_HOLIDAY_LISTS_FROM_SERVER_SUCCEEDED':
      return handleGetHolidayListsFromServerSucceeded(state, action.payload)
    case 'GET_HOLIDAY_LISTS_FROM_SERVER_FAILED':
      return handleGetHolidayListsFromServerFailed(state, action.payload)
    default:
      return state
  }
}

const handleGetHolidayListsFromServerSucceeded = (state, payload) => {
  console.log('Handling get holiday lists from server succeeded', payload)
  let holidayLists = []
  let loadedHolidayLists = payload
  if(loadedHolidayLists && loadedHolidayLists.length > 0 ) {
      holidayLists = loadedHolidayLists
  }
  return { ...state, holidayLists}
}

const handleGetHolidayListsFromServerFailed = (state, payload) => {
  console.log('Handling get holiday lists failed', payload)
  let message = {type: "error", content: "Failed to get holiday lists: " + payload.message}
  return {...state, message}
}
  
export default holidayListsReducer