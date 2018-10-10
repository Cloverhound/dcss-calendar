import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { submitScheduleToServer } from './api'

export function* callScheduleSubmit(action) {
  const { timeRanges, name } = action.payload
  let newTimeRangeArray = timeRanges.map(timeRange => {
    let newTimeRange = {};
    let days = Object.keys(timeRange.week);
    days.forEach(day => {
      if (timeRange.week[day].checked) {
        newTimeRange = { ...newTimeRange, [day]: true }
      }
    })
    return {...newTimeRange, name, open: timeRange.open, closed: timeRange.closed }
  })

  const result = yield call(submitScheduleToServer, newTimeRangeArray[0])

  if (result.errors) {
    console.log(result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("POST GOOD")
    // yield put({ type: "REQUEST_SUCCESSFUL"})
  }
}