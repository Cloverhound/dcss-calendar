import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { getQueues, postQueues, patchQueues, deleteQueue } from './api'

export function* callCreateQueue(action) {
  const { scheduleId, queueName, holidayListId } = action.payload

  const result = yield call(postQueues, { name: queueName, scheduleId, holidayListId })

  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({ type: "REQUEST_ADD_QUEUE_DONE", payload: result })
    // yield put({ type: "REQUEST_SUCCESSFUL"})
  }
}

export function* callGetQueues() {
  const result = yield call(getQueues);
  
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "GET_QUEUES_FROM_SERVER_DONE", payload: result})
  }
}


export function* callUpdateAddQueue(action) {
  const { queueId, scheduleId, queueName } = action.payload
  const result = yield call(patchQueues, { id: queueId, data: { name: queueName, scheduleId } })

  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "REQUEST_ADD_QUEUE_DONE", payload: result})
    yield put({type: "GET_QUEUES_FROM_SERVER", payload: result})
  }
}

export function* callDeleteQueue(action) {
  console.log(" DELETE queue action.payload", action.payload.id)
  const result = yield call(deleteQueue, action.payload.id);
  
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield call(callGetQueues);
    // yield put({type: "GET_QUEUES_FROM_SERVER_DONE", payload: result})
  }
}