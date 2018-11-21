import { takeLatest, all } from 'redux-saga/effects'
import { callScheduleSubmit, callGetSchedules } from './scheduleSagas'
import { callGetQueues } from './queueSagas'
import { callAddQueueSubmit, callUpdateAddQueue } from './addQueueSagas'
import { callCreateHolidayList, callGetHolidayLists, callGetHolidayList, callUpdateHolidayList, callDeleteHolidayList } from './holidaySagas'

export default function* root() {
  yield all([
    yield takeLatest('REQUEST_SCHEDULE_SUBMIT', callScheduleSubmit),
    yield takeLatest('REQUEST_ADD_QUEUE_SUBMIT', callAddQueueSubmit),
    yield takeLatest('REQUEST_ADD_QUEUE_UPDATE', callUpdateAddQueue),
    yield takeLatest('REQUEST_GET_QUEUES', callGetQueues),
    yield takeLatest('REQUEST_GET_SCHEDULES', callGetSchedules),
    yield takeLatest('SUBMIT_NEW_HOLIDAY_LIST_TO_SERVER', callCreateHolidayList),
    yield takeLatest('GET_HOLIDAY_LISTS_FROM_SERVER', callGetHolidayLists),
    yield takeLatest('GET_HOLIDAY_LIST_FROM_SERVER', callGetHolidayList),
    yield takeLatest('SUBMIT_UPDATE_HOLIDAY_LIST_TO_SERVER', callUpdateHolidayList),
    yield takeLatest('SUBMIT_DELETE_HOLIDAY_LIST_TO_SERVER', callDeleteHolidayList),
  ])
}