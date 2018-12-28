import { call, put } from 'redux-saga/effects'
import { getQueues, getQueue, createQueue, updateQueue, deleteQueue } from './api-queues'
import { getQueueFromServerSucceeded, 
         getQueueFromServerFailed, 
         queueLoading, 
         submitUpdateQueueToServerSucceeded,
         submitNewQueueToServerSucceeded, 
         submitNewQueueToServerFailed,
         submitUpdateQueueToServerFailed} from '../actions/index'


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
  yield put(queueLoading())

  const { id, scheduleId, queueName, holidayListId } = action.payload
  const result = yield call(updateQueue, { id: id, data: { name: queueName, scheduleId, holidayListId } })

  if (result.error) {
    yield put(submitUpdateQueueToServerFailed(result.error))
  } else {
    yield put(submitUpdateQueueToServerSucceeded(result))
  }
}

export function* callCreateQueue(action) {
  console.log("action", action)
  const { scheduleId, queueName, holidayListId, history } = action.payload

  const result = yield call(createQueue, { name: queueName, scheduleId, holidayListId })

  if (result.error) {
    yield put(submitNewQueueToServerFailed(result.error))
  } else {
    yield call([history, history.push], '/')
    yield put(submitNewQueueToServerSucceeded(result))}
}

export function* callGetQueues() {
  const result = yield call(getQueues);
  
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    yield put({type: "GET_QUEUES_FROM_SERVER_DONE", payload: result})
  }
}

export function* callDeleteQueue(action) {
  const result = yield call(deleteQueue, action.payload.id);
  
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    yield call(callGetQueues);
  }
}