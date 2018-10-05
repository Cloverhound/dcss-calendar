let initialState = {
  days: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
  initialOpen: "07:00",
  initialClosed: "19:00",
  checked: {
    "mon": false,
    "tues": false,
    "weds": false,
    "thurs": false,
    "fri": false,
    "sat": false,
    "sun": false,
  },
  checkedMon: false,
  checkedTues: false,
  checkedWeds: false,
  checkedThurs: false,
  checkedFri: false,
  checkedSat: false,
  checkedSun: false,
  schedule: {
    "name": "string",
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
      return action.payload
    default:
      return state
  }
}

export default scheduleSelect