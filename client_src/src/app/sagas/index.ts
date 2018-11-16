import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { callScheduleSubmit, callGetSchedules } from './scheduleSagas'
import { callGetQueues } from './queueSagas'
import { callAddQueueSubmit, callUpdateAddQueue } from './addQueueSagas'
import { callNewHolidayListSubmit, callGetHolidayLists } from './holidaySagas'

export default function* root() {
  yield all([
    yield takeLatest('REQUEST_SCHEDULE_SUBMIT', callScheduleSubmit),
    yield takeLatest('REQUEST_ADD_QUEUE_SUBMIT', callAddQueueSubmit),
    yield takeLatest('REQUEST_ADD_QUEUE_UPDATE', callUpdateAddQueue),
    yield takeLatest('REQUEST_GET_QUEUES', callGetQueues),
    yield takeLatest('REQUEST_GET_SCHEDULES', callGetSchedules),
    yield takeLatest('REQUEST_NEW_HOLIDAY_LIST_SUBMIT', callNewHolidayListSubmit),
    yield takeLatest('REQUEST_GET_HOLIDAY_LISTS', callGetHolidayLists)
  ])
}