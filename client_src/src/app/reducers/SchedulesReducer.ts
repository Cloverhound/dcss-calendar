let initialState = {
  initialOpen: "",
  initialClosed: "",
  name: "",
  dropDownID: 0,
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

const createTimeRangeObj = (scheduleFromServer) => {

  let initialRow = {
    "id": 0,
    "open": "",
    "closed": "",
    "week": {
      "mon": {
        "checked": false,
        "disabled": true
      },
      "tues": {
        "checked": false,
        "disabled": true
      },
      "weds": {
        "checked": false,
        "disabled": true
      },
      "thurs": {
        "checked": false,
        "disabled": true
      },
      "fri": {
        "checked": false,
        "disabled": true
      },
      "sat": {
        "checked": false,
        "disabled": true
      },
      "sun": {
        "checked": false,
        "disabled": true
      },
    }
  }

  let newHoursObj = Object.keys(scheduleFromServer.hours).reduce((acc, hour) => {
    let day = hour.substring(0, hour.indexOf("_"))
    let openClosed = hour.substring(hour.indexOf("_") + 1, hour.length)
    if (!acc[day]) {
      acc[day] = { [openClosed]: scheduleFromServer.hours[hour] }
    } else {
      acc[day] = { ...acc[day], [openClosed]: scheduleFromServer.hours[hour] }
    }
    return acc
  }, {})

  let hoursObj = { id_db: scheduleFromServer.id, name: scheduleFromServer.name, week: newHoursObj };

  let newArray: any = [];

  Object.keys(hoursObj.week).forEach(day => {
    //push first thing in
    if (!newArray.length) {
      newArray.push({
        ...initialRow,
        id_db: hoursObj.id_db,
        name: hoursObj.name,
        open: hoursObj.week[day].open,
        closed: hoursObj.week[day].closed,
        week: {
          ...initialRow.week,
          [day]: {
            checked: true,
            disabled: false
          }
        }
      })
    }
    //loop over the new schedules
    for (let i = 0; i < newArray.length; i++) {
      let newObj = newArray[i];
      if (newObj.open === hoursObj.week[day].open &&
        newObj.closed === hoursObj.week[day].closed) {
        newObj.week = {
          ...newObj.week,
          [day]: {
            checked: true,
            disabled: false
          }
        }
        break
      } else if (i === newArray.length - 1) {
        newArray.push({
          ...initialRow,
          id_db: hoursObj.id_db,
          name: hoursObj.name,
          open: hoursObj.week[day].open,
          closed: hoursObj.week[day].closed,
          week: {
            ...initialRow.week,
            [day]: {
              checked: true,
              disabled: false
            }
          }
        })
      }
    }
  })
  return newArray
}

const scheduleReducer = (state: any = initialState, action) => {
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
      let newSchedule = action.payload.map(schedule => {
        let keys = Object.keys(schedule)
        let newWeek = keys.reduce((acc, key) => {
          if (key === "id") {
            acc[key] = schedule.id
          } else if (key === "name") {
            acc[key] = schedule.name
          } else {
            acc.hours = { ...acc.hours, [key]: schedule[key] }
          }
          return acc
        }, { hours: {} })
        return newWeek
      })

      return { ...state, schedules: newSchedule }

    case 'UPDATE_TIME_RANGES':
      let scheduleFromServer = state.schedules.find(schedule => {
        return schedule.id === JSON.parse(action.payload.id)
      })
      let newTimeRange = createTimeRangeObj(scheduleFromServer)

      return { ...state, timeRanges: newTimeRange, name: newTimeRange[0].name }

      case 'RESET_TIME_RANGES':
        return {...state, name: "", timeRanges: [state.initialRow]}

    default:
      return state
  }
}

export default scheduleReducer