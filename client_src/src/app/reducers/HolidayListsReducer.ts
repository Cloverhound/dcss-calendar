const initialState = {
  holidayLists: []
}
  
const holidayListsReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_HOLIDAY_LISTS_REQUEST_SUCCESSFUL':
      console.log('Handling action: GET_HOLIDAYS_LISTS_REQUEST_SUCCESSFUL', action.payload)
      let holidayLists = []
      let loadedHolidayLists = action.payload
      if(loadedHolidayLists && loadedHolidayLists.length > 0 ) {
          holidayLists = loadedHolidayLists
      }
      return { ...state, holidayLists}
    default:
      return state
  }
}
  
  export default holidayListsReducer