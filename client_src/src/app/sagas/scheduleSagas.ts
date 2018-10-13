import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { submitScheduleToServer, getSchedules } from './api'

export function* callScheduleSubmit(action) {
  const { timeRanges, name } = action.payload
  let newTimeRange = {};
  timeRanges.forEach(timeRange => {
    let days = Object.keys(timeRange.week);
    days.forEach(day => {
      if (timeRange.week[day].checked) {
        let dayOpen = day + "_open"
        let dayClosed = day + "_closed"
        newTimeRange = { ...newTimeRange, name, [dayOpen]: timeRange.open, [dayClosed]: timeRange.closed }
      }
    })
  })

  const result = yield call(submitScheduleToServer, newTimeRange)

  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("REQUEST_SUCCESSFUL")
    // yield put({ type: "REQUEST_SUCCESSFUL"})
  }
}

export function* callGetSchedules(action) {
  const result = yield call(getSchedules)
  console.log("result", result)
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "REQUEST_GET_SCHEDULES_DONE", payload: result})
    // yield put({ type: "REQUEST_SUCCESSFUL"})
  }
}