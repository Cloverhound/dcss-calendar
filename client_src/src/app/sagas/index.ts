import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { callScheduleSubmit, callGetAll, callGetSchedules } from './scheduleSagas'

export default function* root() {
  yield all([
    yield takeLatest('REQUEST_SCHEDULE_SUBMIT', callScheduleSubmit),
    yield takeLatest('REQUEST_GET_ALL', callGetAll),
    yield takeLatest('REQUEST_GET_SCHEDULES', callGetSchedules)
  ])
}