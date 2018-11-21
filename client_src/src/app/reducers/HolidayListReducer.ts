let initialState = {
  name: "",
  holidays: [{name: "", date: "", index: 0}],
  active: "true",
  message: {type: "", content: ""} 
}   

const holidayListReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'GET_HOLIDAY_LIST_FROM_SERVER_SUCCEEDED':
      return handleGetHolidayListSucceeded(state, action.payload)
    case 'GET_HOLIDAY_LIST_FROM_SERVER_FAILED':
      return handleGetHolidayListFailed(state, action.payload)
    case 'SUBMIT_UPDATE_HOLIDAY_LIST_TO_SERVER_SUCCEEDED':
      return handleUpdateHolidayListSucceeded(state, action.payload)
    case 'SUBMIT_UPDATE_HOLIDAY_LIST_TO_SERVER_FAILED':
      return handleUpdateHolidayListFailed(state, action.payload)
    case 'SUBMIT_NEW_HOLIDAY_LIST_TO_SERVER_SUCCEEDED':
      return handleNewHolidayListSucceeded(state, action.payload)
    case 'SUBMIT_NEW_HOLIDAY_LIST_TO_SERVER_FAILED':
      return handleNewHolidayListFailed(state, action.payload)
    case 'HANDLE_CLOSE_MESSAGE':
      return handleCloseMessage(state)
    case 'CHANGE_HOLIDAY_LIST_NAME':
      return changeHolidayListName(state, action.payload)
    case 'ADD_HOLIDAY':
      return addHoliday(state)
    case 'CHANGE_HOLIDAY_NAME':
      return changeHolidayName(state, action.payload)
    case 'CHANGE_HOLIDAY_DATE':
      return changeHolidayDate(state, action.payload)
    case 'DELETE_HOLIDAY':        
      return deleteHoliday(state, action.payload)
    default:
      return state
  }
}

const handleCloseMessage = (state) => {
  let message = {type: "", content: ""} 
  return {...state, message}
}

const handleGetHolidayListSucceeded = (state, payload) => {
  console.log('Handling get holiday list succeeded', payload) 
  return payload
}

const handleGetHolidayListFailed = (state, payload) => {
  console.log('Handling get holiday list failed', payload)
  let message = {type: "error", content: "Failed to get holiday list: " + payload.message}
  return {...state, message}
}

const handleUpdateHolidayListSucceeded = (state, payload) => {
  console.log('Handling update holiday list succeeded', payload)
  let message = {type: "success", content: "Successfully updated."}
  return {...state, message}
}

const handleUpdateHolidayListFailed = (state, payload) => {
  console.log('Handling update holiday list failed', payload)
  let message = {type: "error", content: "Failed to update: " + payload.message}
  return {...state, message}
}


const handleNewHolidayListSucceeded = (state, payload) => {
  console.log('Handling new holiday list succeeded', payload)
  let message = {type: "success", content: "Successfully created."}
  return {...state, message}
}

const handleNewHolidayListFailed = (state, payload) => {
  console.log('Handling new holiday list failed', payload)
  let message = {type: "error", content: "Failed to create: " + payload.message}
  return {...state, message}
}



const changeHolidayListName = (state, payload) => {
  console.log('Changing holiday list name', state, payload)
  let name = payload
  return {...state, name}
}

const addHoliday = (state) => {
  console.log('Adding holiday', state)
  let holidays = [...state.holidays]
  let addIndex = holidays.length
  holidays.push({name: "", date: "", index: addIndex, active: true})
  return {...state, holidays}
}

const changeHolidayName = (state, payload) => {
  console.log('Changing holiday name', state, payload)
  let name = payload.name
  let changeIndex = payload.index
  let holidays = [...state.holidays]
  let holiday = holidays.find((currHoliday) => currHoliday.index == changeIndex)
  if(!holiday) {console.log('No holiday with index found!'); return;}
  holiday.name = name

  return {...state, holidays}
}

const changeHolidayDate = (state, payload) => {
  console.log('Changing holiday name', state, payload)
  let date = payload.date
  let changeIndex = payload.index
  let holidays = [...state.holidays]
  let holiday = holidays.find((currHoliday) => currHoliday.index == changeIndex)
  if(!holiday) {console.log('No holiday with index found!'); return;}
  holiday.date = date

  return {...state, holidays}
}

const deleteHoliday = (state, payload) => {
  console.log('Deleting Holiday', JSON.stringify(state), JSON.stringify(payload))
  let holidays = [...state.holidays]
  holidays.splice(payload, 1);
  holidays = updateIndexes(holidays)

  if(holidays.length == 0) {
    let holidays = [...initialState.holidays]
    return {...state, holidays}
  }

  return {...state, holidays}
}

const updateIndexes = (holidays) => {
  console.log('Updating indexes', JSON.stringify(holidays))
  return holidays.map((holiday, i) => {
    holiday.index = i
    return holiday
  })
}

export default holidayListReducer