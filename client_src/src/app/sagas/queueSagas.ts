import { call, put } from 'redux-saga/effects'
import { getQueues, getQueue, createQueue, updateQueue, deleteQueue, optionalPromptToggle } from './api-queues'
import { getQueueFromServerSucceeded, 
         getQueueFromServerFailed, 
         queueLoading, 
         submitUpdateQueueToServerSucceeded,
         submitNewQueueToServerSucceeded, 
         submitNewQueueToServerFailed,
         submitUpdateQueueToServerFailed,
         getQueuesFromServerSucceeded,
         getQueuesFromServerFailed,
         submitDeleteQueueToServerSucceeded,
         submitDeleteQueueToServerFailed,
         submitOptionalPromptsToggleToServerFailed,
         submitOptionalPromptsToggleToServerSucceeded} from '../actions/index'


export function* callGetQueue(action) {
  yield put(queueLoading())

  const result = yield call(getQueue, action.payload)
  if (result.error) {
    yield put(getQueueFromServerFailed(result.error))
  } else {
    yield put(getQueueFromServerSucceeded(result))
  }
}

export function* callUpdateQueue(action) {
  const { history } = action.payload
  yield put(queueLoading())

  const { id, scheduleId, queueName, county_code, holidayListId } = action.payload
  const result = yield call(updateQueue, { id: id, data: { name: queueName, county_code, scheduleId, holidayListId } })

  if (result.error) {
    yield put(submitUpdateQueueToServerFailed(result.error))
  } else {
    yield call([history, history.push], '/')
    yield put(submitUpdateQueueToServerSucceeded(result))
  }
}

export function* callCreateQueue(action) {
  const { scheduleId, queueName, county_code, holidayListId, history } = action.payload
  yield put(queueLoading())

  const result = yield call(createQueue, { name: queueName, county_code, scheduleId, holidayListId })

  if (result.error) {
    yield put(submitNewQueueToServerFailed(result.error))
  } else {
    yield call([history, history.push], '/')
    yield put(submitNewQueueToServerSucceeded(result))}
}

export function* callGetQueues() {
  const result = yield call(getQueues);
  if (result.error) {
    yield put(getQueuesFromServerFailed(result.error))
  } else {
    yield put(getQueuesFromServerSucceeded(result))
  }
}

export function* callDeleteQueue(action) {
  console.log('Call Delete Queue', action.payload)
  const result = yield call(deleteQueue, action.payload.id);
  
  if (result.error) {
    yield put(submitDeleteQueueToServerFailed(result.error))
  } else {
    yield call(callGetQueues)
    yield put(submitDeleteQueueToServerSucceeded(result))
  }
}

export function* callOptionalPromptsToggle(action) {
  const result = yield call(optionalPromptToggle, action.payload);
  if (result.error) {
    yield put(submitOptionalPromptsToggleToServerFailed(result.error))
  } else {
    yield call(callGetQueues)
    yield put(submitOptionalPromptsToggleToServerSucceeded(result))
  }
}
