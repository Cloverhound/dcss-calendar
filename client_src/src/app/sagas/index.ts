import { takeLatest, all } from 'redux-saga/effects'
import { callCreateSchedule, callGetSchedules, callUpdateSchedule, callDeleteSchedule } from './scheduleSagas'
import { callCreateQueue, callGetQueues, callUpdateQueue, callDeleteQueue, callGetQueue  } from './queueSagas'
import { callCreateHolidayList, callGetHolidayLists, callGetHolidayList, callUpdateHolidayList, callDeleteHolidayList } from './holidaySagas'
import { callGetPrompts, callGetPrompt, callGetPromptsWithQueueId, callCreatePrompt, callDeletePrompt } from './promptSagas';

export default function* root() {
  yield all([
    yield takeLatest('GET_SCHEDULES_FROM_SERVER', callGetSchedules),
    yield takeLatest('SUBMIT_NEW_SCHEDULE_TO_SERVER', callCreateSchedule),
    yield takeLatest('SUBMIT_UPDATE_SCHEDULE_TO_SERVER', callUpdateSchedule),
    yield takeLatest('SUBMIT_DELETE_SCHEDULE_TO_SERVER', callDeleteSchedule),


    yield takeLatest('SUBMIT_NEW_QUEUE_TO_SERVER', callCreateQueue),
    yield takeLatest('SUBMIT_DELETE_QUEUE_TO_SERVER', callDeleteQueue),
    yield takeLatest('SUBMIT_UPDATE_QUEUE_TO_SERVER', callUpdateQueue),
    yield takeLatest('GET_QUEUES_FROM_SERVER', callGetQueues),
    yield takeLatest('GET_QUEUE_FROM_SERVER', callGetQueue),


    yield takeLatest('SUBMIT_NEW_HOLIDAY_LIST_TO_SERVER', callCreateHolidayList),
    yield takeLatest('GET_HOLIDAY_LISTS_FROM_SERVER', callGetHolidayLists),
    yield takeLatest('GET_HOLIDAY_LIST_FROM_SERVER', callGetHolidayList),
    yield takeLatest('SUBMIT_UPDATE_HOLIDAY_LIST_TO_SERVER', callUpdateHolidayList),
    yield takeLatest('SUBMIT_DELETE_HOLIDAY_LIST_TO_SERVER', callDeleteHolidayList),

    yield takeLatest('GET_PROMPTS_FROM_SERVER', callGetPrompts),
    yield takeLatest('GET_PROMPT_FROM_SERVER', callGetPrompt),
    yield takeLatest('GET_PROMPTS_WITH_QUEUE_ID', callGetPromptsWithQueueId),
    yield takeLatest('SUBMIT_UPLOAD_PROMPT_TO_SERVER', callCreatePrompt),
    yield takeLatest('SUBMIT_DELETE_PROMPT_TO_SERVER', callDeletePrompt),
  ])
}