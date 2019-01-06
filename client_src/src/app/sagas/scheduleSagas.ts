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
  const { history, obj } = action.payload
  yield put(scheduleLoading())
  const result = yield call(createSchedule, obj)
  if (result.error) {
    yield put(submitNewScheduleToServerFailed(result.error))
  } else {
    yield put(submitNewScheduleToServerSucceeded(result))
    yield call([history, history.push], '/schedules')
  }
}

export function* callUpdateSchedule(action) {
  const { history, obj } = action.payload;
  yield put(scheduleLoading())
  
  const result = yield call(updateSchedule, obj)
  if (result.error) {
    yield put(submitUpdateScheduleToServerFailed(result.error))
  } else {
    yield call([history, history.push], '/schedules')
    yield put(submitUpdateScheduleToServerSucceeded(result))
  }
}

export function* callDeleteSchedule(action) {
  yield put(scheduleLoading())
  
  const result = yield call(deleteSchedule, action.payload)
  if (result.error) {
    yield put(submitDeleteScheduleToServerFailed(result.error))
  } else {
    yield call(callGetSchedules)
    yield put(submitDeleteScheduleToServerSucceeded(result))
  }
}