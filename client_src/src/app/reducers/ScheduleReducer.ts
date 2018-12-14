var emptyRecurringTimeRange = {
    index: 0,
    start: "",
    end: "",
    week: {
        mon: {checked: false},
        tues: {checked: false},
        weds: {checked: false},
        thurs: {checked: false},
        fri: {checked: false},
        sat: {checked: false},
        sun: {checked: false}
    }
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
    singleDateTimeRanges: [{...emptySingleDateTimeRange}]
}

const ScheduleReducer = (state: any = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_RECURRING_DAY':
            return toggleRecurringDay(state, action.payload)
        case 'DELETE_RECURRING_TIME_RANGE':
            return deleteRecurringTimeRange(state, action.payload)
        case 'ADD_RECURRING_TIME_RANGE':
            return addRecurringTimeRange(state, action.payload)
        case 'CHANGE_SCHEDULE_NAME':
            return updateRegularScheduleName
        case 'CHANGE_START_OF_RECURRING_TIME_RANGE':
            return changeStartOfRecurringTimeRange(state, action.payload)
        case 'CHANGE_END_OF_RECURRING_TIME_RANGE':
            return changeEndOfRecurringTimeRange(state, action.payload)
        case 'RESET_SCHEDULE':
            return resetSchedule()
        default:
            return state
    }
}

function toggleRecurringDay(state, payload) {
    console.log('Toggling Recurring Day', payload.index)

    let index = payload.index
    let day = payload.day
    let checked = payload.event

    let recurringTimeRanges = [...state.recurringTimeRanges]
    let recurringTimeRange = recurringTimeRanges.find((currTimeRange) => currTimeRange.index === index)
    
    recurringTimeRange.week[day].checked = checked
    return { ...state, recurringTimeRanges }
}

function deleteRecurringTimeRange(state, payload) {
    console.log('Deleting Recurring Time Range', payload.index)

    if (state.recurringTimeRanges.length === 1) {
        return { ...initialState }
    }

    let recurringTimeRanges = [...state.recurringTimeRanges]
    recurringTimeRanges.splice(payload.index, 1);
    recurringTimeRanges = updateIndices(recurringTimeRanges)
    return { ...state, recurringTimeRanges }
}

function addRecurringTimeRange(state, payload) {
    console.log('Adding recurring time range')
    let recurringTimeRanges = [...state.recurringTimeRanges]
    let index = recurringTimeRanges.length
    let recurringTimeRange = { ...emptyRecurringTimeRange, index }
    recurringTimeRanges.push(recurringTimeRange)
    return { ...state, recurringTimeRanges}
}

function updateRegularScheduleName(state, payload) {
    console.log('Updating regular schedule name', payload.index, payload.value)
    return { ...state, regularSchedule: {...state.regularSchedule, name: payload.name }}
}

function changeStartOfRecurringTimeRange(state, payload) {
    console.log('Changing start time of recurring time range', payload.index)

    let recurringTimeRanges = [...state.recurringTimeRanges]
    let recurringTimeRange : any = recurringTimeRanges.find(payload.index)

    if(!recurringTimeRange) {
        console.error('Error: No recurring time range found. This should not have happened.')
        return {...state}
    }

    recurringTimeRange.start = payload.value
    return { ...state, recurringTimeRanges }
}

function changeEndOfRecurringTimeRange(state, payload) {
    console.log('Changing start end time of recurring time range', payload.index)

    let recurringTimeRanges = [...state.recurringTimeRanges]
    let recurringTimeRange : any = recurringTimeRanges.find(payload.index)

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
    return elements.map((element, i) => {
      element.index = i
      return element
    })
}


export default ScheduleReducer

