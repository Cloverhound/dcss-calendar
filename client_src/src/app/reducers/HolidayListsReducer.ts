const initialState = {
  holidayLists: []
}
  
const holidayListsReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_HOLIDAY_LISTS_FROM_SERVER_SUCCEEDED':
      return handleGetHolidayListsFromServerSucceeded(state, action.payload)
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
  
export default holidayListsReducer