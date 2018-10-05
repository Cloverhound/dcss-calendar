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

const scheduleSelect = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKED':
      const {id, day, event} = action.payload
      let select = state.selectRow.filter(obj => {
        return obj.id === id
      })
      select[0].week[day].checked = event
      console.log(action.payload, select[0].week[day])
      return { ...state }
    case 'UPDATE_DISABLED':
      // const {id, day, event} = action.payload
      // let select = state.selectRow.filter(obj => {
      //   return obj.id === id
      // })
      // select[0].week[day].checked = event
      // console.log(action.payload, select[0].week[day])
      return { ...state }
    default:
      return state
  }
}

export default scheduleSelect