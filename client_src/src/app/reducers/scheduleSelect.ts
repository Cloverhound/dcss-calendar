let initialState = {
  initialOpen: "07:00",
  initialClosed: "19:00",
  name: "",
  initialRow: {
    "id": 0,
    "from": "",
    "to": "",
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
  timeRanges: [
    {
      "id": 0,
      "from": "",
      "to": "",
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

const updateCheckedState = (selectedArray, unselectedArray) => {
  let selectedKeys = Object.keys(selectedArray[0].week);

  selectedKeys.forEach(day => {
    if (selectedArray[0].week[day].checked === true) {
      unselectedArray.forEach(row => {
        if (row.week[day]) {
          row.week[day].disabled = false
        }
      })
    }
  })
  return unselectedArray
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
      if (row.week[day].checked === true) {
        initialRow.week[day].disabled = true
      }
    })
  })

  return initialRow
}

const scheduleSelect = (state = initialState, action) => {
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
      })

      newTimeRanges.splice(action.payload.row.id, 1);
      newTimeRanges = updateIDs(newTimeRanges)

      let newTimeRangesCheckedState = updateCheckedState(selectedArray, newTimeRanges)

      return { ...state, timeRanges: newTimeRangesCheckedState }

    case 'ADD_SCHEDULE_SELECT':
      let newWeek = findCheckedDays(state)
      let newObj = { ...newWeek }
      return { ...state, timeRanges: [...state.timeRanges, newObj] }

    default:
      return state
  }
}

export default scheduleSelect