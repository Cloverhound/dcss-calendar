let emptyRecurringTimeRange = {
    id: 0,
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

let emptySingleDateTimeRange = {
    id: 0,
    date: "",
    start: "",
    end: ""
}


let initialState = {
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
        case 'CHANGE_START_END_TIME_OF_RECURRING_TIME_RANGE':
            return updateStartEndTimeOfRecurringTimeRange(state, action.payload)
        case 'RESET_SCHEDULE':
            return resetSchedule()
        default:
            return state
    }
}

function toggleRecurringDay(state, payload) {
    console.log('Toggling Recurring Day', payload.recurringTimeRange.id)

    let id = payload.id
    let day = payload.day
    let checked = payload.event

    let recurringTimeRanges = {...state.recurringTimeRanges}
    let recurringTimeRange = recurringTimeRanges.find((currTimeRange) => currTimeRange.id === id)
    
    recurringTimeRange.week[day].checked = checked
    return { ...state, recurringTimeRanges }
}

function deleteRecurringTimeRange(state, payload) {
    console.log('Deleting Recurring Time Range', payload.id)

    if (state.recurringTimeRanges.length === 1) {
        return { ...initialState }
    }

    let recurringTimeRanges = {...state.recurringTimeRanges}
    recurringTimeRanges.splice(payload.id, 1);
    recurringTimeRanges = updateIDs(recurringTimeRanges)
    return { ...state, recurringTimeRanges }
}

function addRecurringTimeRange(state, payload) {
    console.log('Adding recurring time range')
    var recurringTimeRanges = {...state.recurringTimeRanges}
    var id = recurringTimeRanges.length
    var recurringTimeRange = { ...emptyRecurringTimeRange, id }
    recurringTimeRanges.push(recurringTimeRange)
    return { ...state, recurringTimeRanges}
}

function updateRegularScheduleName(state, payload) {
    console.log('Updating regular schedule name', payload.id, payload.value)
    return { ...state, regularSchedule: {...state.regularSchedule, name: payload.name }}
}

function updateStartEndTimeOfRecurringTimeRange(state, payload) {
    console.log('Updating start end time of recurring time range', payload.id)

    let regularSchedule = {...state.regularSchedule}
    let recurringTimeRange = regularSchedule.recurringTimeranges.find(payload.id)
    recurringTimeRange[payload.name] = payload.value
    return { ...state, regularSchedule }
}

function resetSchedule() {
    console.log('Resetting schedule')
    return {...initialState}
}

  
const updateIDs = (elements) => {
    return elements.map((element, i) => {
      element.id = i
      return element
    })
}


export default ScheduleReducer

