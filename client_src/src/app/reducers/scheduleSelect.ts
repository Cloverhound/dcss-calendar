let initialState = {
  initialOpen: "07:00",
  initialClosed: "19:00",
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
    },
    {
      "id": 1,
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
    {
      "id": 2,
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

const scheduleSelect = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKED':
      let select = state.selectRow.filter(obj => {
        return obj.id === action.payload.id
      })

      select[0].week[action.payload.day].checked = action.payload.event

      return { ...state }

    case 'UPDATE_DISABLED':
      let weeks = state.selectRow.filter(obj => {
        return obj.id != action.payload.id
      })
      weeks.forEach(obj => {
        obj.week[action.payload.day].disabled = action.payload.event
      })

      return { ...state }

    case 'DELETE_ROW':
      let selectedRow = state.selectRow.filter(obj => {
        return obj.id === action.payload.id
      })

      let unselectedRows = state.selectRow.filter(obj => {
        return obj.id != action.payload.id
      })

      let updated = updateCheckedState(selectedRow, unselectedRows)

      state.selectRow = updated
      return { ...state }

    default:
      return state
  }
}

export default scheduleSelect