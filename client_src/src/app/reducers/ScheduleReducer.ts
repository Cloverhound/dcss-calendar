var emptyRecurringTimeRange = {
    index: 0,
    start: "",
    end: "",
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false
}

var emptySingleDateTimeRange = {
    index: 0,
    date: "",
    start: "",
    end: ""
}

var initialEmptyRecurringTimeRange = {
    index: 0,
    start: "",
    end: "",
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false
}

var initialEmptySingleDateTimeRange = {
    index: 0,
    date: "",
    start: "",
    end: ""
}

var initialState = {
    name: "",
    recurringTimeRanges: [{...emptyRecurringTimeRange}],
    singleDateTimeRanges: [{...emptySingleDateTimeRange}],
    message: {type: "", content: ""},
    loading: false
}

const ScheduleReducer = (state: any = initialState, action) => {
    switch (action.type) {
        case 'GET_SCHEDULE_FROM_SERVER_SUCCEEDED':
            return handleGetScheduleSucceeded(action.payload)
        case 'GET_SCHEDULE_FROM_SERVER_FAILED':
            return handleGetScheduleFailed(state, action.payload)
        case 'TOGGLE_RECURRING_DAY':
            return toggleRecurringDay(state, action.payload)
        case 'DELETE_RECURRING_TIME_RANGE':
            return deleteRecurringTimeRange(state, action.payload)
        case 'DELETE_SINGLE_DATE_TIME_RANGE':
            return deleteSingleDateTimeRange(state, action.payload)
        case 'ADD_RECURRING_TIME_RANGE':
            return addRecurringTimeRange(state)
        case 'ADD_SINGLE_DATE_TIME_RANGE':
            return addSingleDateTimeRange(state)
        case 'CHANGE_SCHEDULE_NAME':
            return changeScheduleName(state, action.payload)
        case 'CHANGE_START_OF_RECURRING_TIME_RANGE':
            return changeStartOfRecurringTimeRange(state, action.payload)
        case 'CHANGE_END_OF_RECURRING_TIME_RANGE':
            return changeEndOfRecurringTimeRange(state, action.payload)
        case 'CHANGE_START_OF_SINGLE_DATE_TIME_RANGE':
            return changeStartOfSingleDateTimeRange(state, action.payload)
        case 'CHANGE_END_OF_SINGLE_DATE_TIME_RANGE':
            return changeEndOfSingleDateTimeRange(state, action.payload)
        case 'CHANGE_DATE_OF_SINGLE_DATE_TIME_RANGE':
            return changeDateOfSingleDateTimeRange(state, action.payload)
        case 'RESET_SCHEDULE':
            return resetSchedule(state)
        case 'SCHEDULE_LOADING':
            return handleScheduleLoading(state)
        case 'HANDLE_CLOSE_MESSAGE':
            return handleCloseMessage(state)

        case 'SUBMIT_NEW_SCHEDULE_TO_SERVER_SUCCEEDED':
            return submitNewScheduleToServerSucceeded(state, action.payload)
         case 'SUBMIT_NEW_SCHEDULE_TO_SERVER_FAILED':
            return submitNewScheduleToServerFailed(state, action.payload)

        case 'SUBMIT_UPDATE_SCHEDULE_TO_SERVER_SUCCEEDED':
            return submitUpdateScheduleToServerSucceeded(state, action.payload)
         case 'SUBMIT_UPDATE_SCHEDULE_TO_SERVER_FAILED':
            return submitUpdateScheduleToServerFailed(state, action.payload)
        default:
            return state
    }
}

const handleCloseMessage = (state) => {
    let message = {type: "", content: ""} 
    return {...state, message}
  }

const handleScheduleLoading = (state) => {
    let loading = true
    return {...state, loading}
  }

function handleGetScheduleSucceeded(payload) {
    console.log('Handling get schedule succeeded', payload)
    payload.loading = false
    if(!payload.recurringTimeRanges || payload.recurringTimeRanges.length == 0) {
        payload.recurringTimeRanges = [{...emptyRecurringTimeRange}]
    }
    if(!payload.singleDateTimeRanges || payload.singleDateTimeRanges.length == 0) {
        payload.singleDateTimeRanges = [{...emptySingleDateTimeRange}]
    }

    updateIndices(payload.recurringTimeRanges)
    updateIndices(payload.singleDateTimeRanges)
    
    return payload
}

function handleGetScheduleFailed(state, payload) {
    console.log('Handling get schedule failed', payload)
    let message = {type: "error", content: "Failed to get schedule: " + payload.message}
    let loading = false
    return {...state, message, loading}
}

function toggleRecurringDay(state, payload) {
    console.log('Toggling Recurring Day', payload, state)

    let index = payload.index
    let day = payload.day

    let recurringTimeRanges = [...state.recurringTimeRanges]
    let recurringTimeRange = recurringTimeRanges[index]
    
    recurringTimeRange[day] = !recurringTimeRange[day]
    return { ...state, recurringTimeRanges }
}

function deleteRecurringTimeRange(state, payload) {
    console.log('Deleting Recurring Time Range', payload, state)

    if (state.recurringTimeRanges.length === 1) {
        return { ...state, recurringTimeRanges: [{...emptyRecurringTimeRange}] }
    }

    let recurringTimeRanges = [...state.recurringTimeRanges]
    recurringTimeRanges.splice(payload.index, 1);
    recurringTimeRanges = updateIndices(recurringTimeRanges)
    return { ...state, recurringTimeRanges }
}

function deleteSingleDateTimeRange(state, payload) {
    console.log('Deleting Single Date Time Range', payload, state)

    if (state.singleDateTimeRanges.length === 1) {
        return { ...state, singleDateTimeRanges: [{...emptySingleDateTimeRange}] }
    }

    let singleDateTimeRanges = [...state.singleDateTimeRanges]
    singleDateTimeRanges.splice(payload.index, 1);
    singleDateTimeRanges = updateIndices(singleDateTimeRanges)
    return { ...state, singleDateTimeRanges }
}

function addRecurringTimeRange(state) {
    console.log('Adding recurring time range', state)
    let recurringTimeRanges = [...state.recurringTimeRanges]
    let index = recurringTimeRanges.length
    let recurringTimeRange = { ...emptyRecurringTimeRange, index }
    recurringTimeRanges.push(recurringTimeRange)
    return { ...state, recurringTimeRanges}
}

function addSingleDateTimeRange(state) {
    console.log('Adding single date time range', state)
    let singleDateTimeRanges = [...state.singleDateTimeRanges]
    let index = singleDateTimeRanges.length
    let singleDateTimeRange = { ...emptySingleDateTimeRange, index }
    singleDateTimeRanges.push(singleDateTimeRange)
    return { ...state, singleDateTimeRanges}
}

function changeScheduleName(state, payload) {
    console.log('Changing schedule name',  payload.name)
    return { ...state, name: payload.name}
}

function changeStartOfRecurringTimeRange(state, payload) {
    console.log('Changing start time of recurring time range', payload)

    let recurringTimeRanges = [...state.recurringTimeRanges]
    let recurringTimeRange  = recurringTimeRanges[payload.index]

    if(!recurringTimeRange) {
        console.error('Error: No recurring time range found. This should not have happened.')
        return {...state}
    }

    recurringTimeRange.start = payload.value
    return { ...state, recurringTimeRanges }
}

function changeStartOfSingleDateTimeRange(state, payload) {
    console.log('Changing start time of single date time range', payload)

    let singleDateTimeRanges = [...state.singleDateTimeRanges]
    let singleDateTimeRange  = singleDateTimeRanges[payload.index]

    if(!singleDateTimeRange) {
        console.error('Error: No single date time range found. This should not have happened.')
        return {...state}
    }

    singleDateTimeRange.start = payload.value
    return { ...state, singleDateTimeRanges }
}

function changeEndOfRecurringTimeRange(state, payload) {
    console.log('Changing end time of recurring time range', payload)

    let recurringTimeRanges = [...state.recurringTimeRanges]
    let recurringTimeRange  = recurringTimeRanges[payload.index]

    if(!recurringTimeRange) {
        console.error('Error: No recurring time range found. This should not have happened.')
        return {...state}
    }
    
    recurringTimeRange.end = payload.value
    return { ...state, recurringTimeRanges }
}

function changeEndOfSingleDateTimeRange(state, payload) {
    console.log('Changing end time of single date time range', payload)

    let singleDateTimeRanges = [...state.singleDateTimeRanges]
    let singleDateTimeRange  = singleDateTimeRanges[payload.index]

    if(!singleDateTimeRange) {
        console.error('Error: No single date time range found. This should not have happened.')
        return {...state}
    }
    
    singleDateTimeRange.end = payload.value
    return { ...state, singleDateTimeRanges }
}

function changeDateOfSingleDateTimeRange(state, payload) {
    console.log('Changing date of single date time range', state, payload)
    let singleDateTimRanges = [...state.singleDateTimeRanges]
    let singleDateTimeRange = singleDateTimRanges[payload.index]
    if(!singleDateTimeRange) {console.log('No single date time range with index found!'); return;}
    singleDateTimeRange.date = payload.date
  
    return {...state, singleDateTimRanges}
}

function resetSchedule(state) {
    console.log('Resetting schedule')
    return {...state,  name: "", 
    recurringTimeRanges: [JSON.parse(JSON.stringify(emptyRecurringTimeRange))], 
    singleDateTimeRanges: [JSON.parse(JSON.stringify(emptySingleDateTimeRange))], 
    message: {type: "", content: ""},
    loading: false}
}

const updateIndices = (elements) => {
    console.log('Updating indices', elements)
    let ret = elements.map((element, i) => {
      element.index = i
      return element
    })
    console.log('Updatd indices', ret)
    return ret
}

function submitNewScheduleToServerSucceeded(state, payload) {
    let message = {type: "success", content: "Successfully created schedule."}
    let loading = false
    console.log('Handling submit create schedule to server succeeded')
    return {...state, message, loading}
  }

function submitNewScheduleToServerFailed(state, payload) {
    let message = {type: "error", content: "Failed to create schedule: " + payload.message}
    let loading = false
    console.log('Handling submit create schedule to server failed')
    return {...state, message, loading, scheduleToDeleteID: null}
  }
function submitUpdateScheduleToServerSucceeded(state, payload) {
    let message = {type: "success", content: "Successfully updated schedule."}
    let loading = false
    console.log('Handling submit update schedule to server succeeded')
    return {...state, message, loading}
  }

function submitUpdateScheduleToServerFailed(state, payload) {
    let message = {type: "error", content: "Failed to update schedule: " + payload.message}
    let loading = false
    console.log('Handling submit update schedule to server failed')
    return {...state, message, loading, scheduleToDeleteID: null}
  }


export default ScheduleReducer

