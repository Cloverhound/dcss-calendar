import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import {callScheduleSubmit} from './scheduleSagas'

export default function* root() {
  yield all([
    yield takeLatest('REQUEST_SCHEDULE_SUBMIT', callScheduleSubmit)
  ])
}