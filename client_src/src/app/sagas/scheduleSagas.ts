import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { postSchedules, getSchedules, putSchedules, deleteSchedules } from './api'

export function* callGetSchedules() {
  const result = yield call(getSchedules)
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "REQUEST_GET_SCHEDULES_DONE", payload: result})
  }
}

export function* callPostSchedule(action) {
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

  const result = yield call(postSchedules, newTimeRange)

  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield call(callGetSchedules)
    yield put({ type: "RESET_TIME_RANGES" })
  }
}

export function* callPutSchedule(action) {
  const { timeRanges, name, id } = action.payload
  let newTimeRange = {};
  timeRanges.forEach(timeRange => {
    let days = Object.keys(timeRange.week);
    days.forEach(day => {
      if (timeRange.week[day].checked) {
        let dayOpen = day + "_open"
        let dayClosed = day + "_closed"
        newTimeRange = { ...newTimeRange, name, id: timeRanges[0].id_db, [dayOpen]: timeRange.open, [dayClosed]: timeRange.closed }
      }
    })
  })

  const result = yield call(putSchedules, newTimeRange)

  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield call(callGetSchedules)
    // yield put({type: "REQUEST_GET_SCHEDULES_DONE", payload: result})
  }
}

export function* callDeleteSchedule(action) {
  const result = yield call(deleteSchedules, action.payload)
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    yield call(callGetSchedules)
    console.log("REQUEST_SUCCESSFUL")
  }
}