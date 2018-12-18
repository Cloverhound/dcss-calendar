import { call, put } from 'redux-saga/effects'
import { createSchedule, getSchedules, updateSchedule, deleteSchedule, getSchedule } from './api-schedules'
import {scheduleLoading,
        getSchedulesFromServerSucceeded,
        getSchedulesFromServerFailed,
        getScheduleFromServerSucceeded,
        getScheduleFromServerFailed,
        submitNewScheduleToServerSucceeded,
        submitNewScheduleToServerFailed,
        submitUpdateScheduleToServerSucceeded,
        submitUpdateScheduleToServerFailed,
        submitDeleteScheduleToServerSucceeded,
        submitDeleteScheduleToServerFailed} from '../actions/index'

export function* callGetSchedules() {
  yield put(scheduleLoading())

  const result = yield call(getSchedules)
  if (result.error) {
    yield put(getSchedulesFromServerFailed(result.error))
  } else {
    yield put(getSchedulesFromServerSucceeded(result))
  }
}

export function* callGetSchedule(action) {
  yield put(scheduleLoading())

  const result = yield call(getSchedule, action.payload)
  if (result.error) {
    yield put(getScheduleFromServerFailed(result.error))
  } else {
    yield put(getScheduleFromServerSucceeded(result))
  }
}

export function* callCreateSchedule(action) {
  yield put(scheduleLoading())

  const result = yield call(createSchedule, action.payload)
  if (result.error) {
    yield put(submitNewScheduleToServerFailed(result.error))
  } else {
    yield put(submitNewScheduleToServerSucceeded(result))
  }
}

export function* callUpdateSchedule(action) {
  yield put(scheduleLoading())

  const result = yield call(updateSchedule, action.payload)
  if (result.error) {
    yield put(submitUpdateScheduleToServerFailed(result.error))
  } else {
    yield put(submitUpdateScheduleToServerSucceeded(result))
  }
}

export function* callDeleteSchedule(action) {
  yield put(scheduleLoading())
  
  const result = yield call(updateSchedule, action.payload)
  if (result.error) {
    yield put(submitDeleteScheduleToServerFailed(result.error))
  } else {
    yield put(submitDeleteScheduleToServerSucceeded(result))
  }
}