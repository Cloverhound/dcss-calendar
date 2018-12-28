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
        case 'ADD_RECURRING_TIME_RANGE':
            return addRecurringTimeRange(state)
        case 'CHANGE_SCHEDULE_NAME':
            return changeScheduleName(state, action.payload)
        case 'CHANGE_START_OF_RECURRING_TIME_RANGE':
            return changeStartOfRecurringTimeRange(state, action.payload)
        case 'CHANGE_END_OF_RECURRING_TIME_RANGE':
            return changeEndOfRecurringTimeRange(state, action.payload)
        case 'RESET_SCHEDULE':
            return resetSchedule()
        case 'SCHEDULE_LOADING':
            return handleScheduleLoading(state)
        case 'HANDLE_CLOSE_MESSAGE':
            return handleCloseMessage(state)
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
        return { ...initialState }
    }

    let recurringTimeRanges = [...state.recurringTimeRanges]
    recurringTimeRanges.splice(payload.index, 1);
    recurringTimeRanges = updateIndices(recurringTimeRanges)
    return { ...state, recurringTimeRanges }
}

function addRecurringTimeRange(state) {
    console.log('Adding recurring time range', state)
    let recurringTimeRanges = [...state.recurringTimeRanges]
    let index = recurringTimeRanges.length
    let recurringTimeRange = { ...emptyRecurringTimeRange, index }
    recurringTimeRanges.push(recurringTimeRange)
    console.log('Time ranges after adding', recurringTimeRanges)
    return { ...state, recurringTimeRanges}
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

function resetSchedule() {
    console.log('Resetting schedule')
    return {...initialState}
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


export default ScheduleReducer

