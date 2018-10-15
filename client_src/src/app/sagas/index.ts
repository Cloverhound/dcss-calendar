import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import {callScheduleSubmit, callGetSchedules} from './scheduleSagas'
import {callGetQueues} from './queueSagas'

export default function* root() {
  yield all([
    yield takeLatest('REQUEST_SCHEDULE_SUBMIT', callScheduleSubmit),
    yield takeLatest('REQUEST_GET_QUEUES', callGetQueues),
    yield takeLatest('REQUEST_GET_SCHEDULES', callGetSchedules),
  ])
}