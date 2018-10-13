let initialState = {
  initialOpen: "",
  initialClosed: "",
  name: "",
  initialRow: {
    "id": 0,
    "open": "",
    "closed": "",
    "week": {
      "mon": {
        "checked": false,
        "disabled": false
      },
      "tues": {
        "checked": false,
        "disabled": false
      },
      "weds": {
        "checked": false,
        "disabled": false
      },
      "thurs": {
        "checked": false,
        "disabled": false
      },
      "fri": {
        "checked": false,
        "disabled": false
      },
      "sat": {
        "checked": false,
        "disabled": false
      },
      "sun": {
        "checked": false,
        "disabled": false
      },
    }
  },
  schedules: [],
  timeRanges: [
    {
      "id": 0,
      "open": "",
      "closed": "",
      "week": {
        "mon": {
          "checked": false,
          "disabled": false
        },
        "tues": {
          "checked": false,
          "disabled": false
        },
        "weds": {
          "checked": false,
          "disabled": false
        },
        "thurs": {
          "checked": false,
          "disabled": false
        },
        "fri": {
          "checked": false,
          "disabled": false
        },
        "sat": {
          "checked": false,
          "disabled": false
        },
        "sun": {
          "checked": false,
          "disabled": false
        },
      }
    }
  ],
}

const updateCheckedStateOnDelete = (deletedTimeRange, newTimeRanges) => {
  let days = Object.keys(deletedTimeRange.week);

  days.forEach(day => {
    if (deletedTimeRange.week[day].checked) {
      newTimeRanges.forEach(row => {
        row.week[day].disabled = false
      })
    }
  })
  return newTimeRanges
}

const updateDisabledOnClick = (item, day, event) => {
  return {
    ...item,
    week: {
      ...item.week,
      [day]: {
        ...item.week[day],
        disabled: event
      }
    }
  }
}

const updateIDs = (timeRanges) => {
  return timeRanges.map((timeRange, i) => {
    timeRange.id = i
    return timeRange
  })
}

const findCheckedDays = state => {
  let id = state.timeRanges.length
  let initialRow = { ...state.initialRow, id }

  state.timeRanges.forEach(row => {
    let keys = Object.keys(row.week);

    keys.forEach(day => {
      if (row.week[day].checked) {
        initialRow.week[day].disabled = true
      }
    })
  })

  return initialRow
}

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKED':
      let newSelectArray = state.timeRanges.map((item, index) => {
        if (item.id === action.payload.row.id) {
          return {
            ...item,
            week: {
              ...item.week,
              [action.payload.day]: {
                ...item.week[action.payload.day],
                checked: action.payload.event
              }
            }
          }
        } else {
          return updateDisabledOnClick(item, action.payload.day, action.payload.event)
        }
      })
      return { ...state, timeRanges: newSelectArray }

    case 'DELETE_ROW':
      if (state.timeRanges.length === 1) {
        return { ...state }
      }
      let newTimeRanges = [...state.timeRanges]
      let selectedArray = state.timeRanges.filter(el => {
        return el.id === action.payload.row.id
      })[0]

      newTimeRanges.splice(action.payload.row.id, 1);
      newTimeRanges = updateIDs(newTimeRanges)

      let newTimeRangesCheckedState = updateCheckedStateOnDelete(selectedArray, newTimeRanges)

      return { ...state, timeRanges: newTimeRangesCheckedState }

    case 'ADD_SCHEDULE_SELECT':
      let newWeek = findCheckedDays(state)
      let newObj = { ...newWeek }
      return { ...state, timeRanges: [...state.timeRanges, newObj] }

    case 'UPDATE_NAME_FIELD':
      return { ...state, name: action.payload.name }

    case 'UPDATE_OPEN_CLOSED_TIME':
      let newOpenClosed = state.timeRanges.map(timeRange => {
        if (timeRange.id === action.payload.row.id) {
          timeRange[action.payload.name] = action.payload.value
        }
        return timeRange
      })

      return { ...state, timeRanges: newOpenClosed }

      case 'REQUEST_GET_SCHEDULES_DONE':
      return {...state, schedules: action.payload}

    default:
      return state
  }
}

export default scheduleReducer