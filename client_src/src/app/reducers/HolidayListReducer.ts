let initialState = {
  name: "",
  holidays: [{name: "", date: "", index: 0}],
  active: "true" 
}   

const holidayListReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'GET_HOLIDAY_LIST_REQUEST_SUCCESSFUL':
      return handleGetHolidayListRequestSuccessful(state, action.payload)
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

const handleGetHolidayListRequestSuccessful = (state, payload) => {
  console.log('Handling getHolidayListRequestSuccessful', payload)
  
  return payload
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