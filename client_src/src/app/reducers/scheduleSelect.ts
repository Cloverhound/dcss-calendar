let initialState = {
  initialOpen: "07:00",
  initialClosed: "19:00",
  initialRow: {
    "id": 0,
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
  selectRow: [
    {
      "id": 0,
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
  schedule: {
    "name": "",
    "sun_start": "",
    "sun_end": "",
    "mon_start": "",
    "mon_end": "",
    "tues_start": "",
    "tues_end": "",
    "weds_start": "",
    "weds_end": "",
    "thurs_start": "",
    "thurs_end": "",
    "fri_start": "",
    "fri_end": "",
    "sat_start": "",
    "sat_end": "",
  }
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

const updateDisabled = (item, day, event) => {
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

const scheduleSelect = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKED':

      let newSelectArray = state.selectRow.map((item, index) => {
        if (item.id === action.payload.id) {
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
          return updateDisabled(item, action.payload.day, action.payload.event)
        }
      })

      return { ...state, selectRow: newSelectArray }

    case 'DELETE_ROW':
      // if (state.selectRow.length != 1) {
      //   let selectedRow = state.selectRow.filter(obj => {
      //     return obj.id === action.payload.id
      //   })

      //   let unselectedRows = state.selectRow.filter(obj => {
      //     return obj.id != action.payload.id
      //   })

      //   let updated = updateCheckedState(selectedRow, unselectedRows)

      //   state.selectRow = updated
      //   return { ...state }
      // }
      return { ...state }

    case 'ADD_SCHEDULE_SELECT':
      let id = state.selectRow.length - 1
      id++

      let newInitialRow = { ...state.initialRow };
      let newSelectedRow = state.selectRow.slice()
      let updateID = { ...newInitialRow, id }

      newSelectedRow.push(updateID)

      return { ...state, selectRow: [...newSelectedRow] }

    default:
      return state
  }
}

export default scheduleSelect