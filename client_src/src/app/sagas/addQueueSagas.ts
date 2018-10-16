import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { submitQueueToServer, submitUpdateQueueToServer } from './api'

export function* callAddQueueSubmit(action) {
  const { scheduleId, queueName } = action.payload

  const result = yield call(submitQueueToServer, { name: queueName, scheduleId })

  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({ type: "REQUEST_ADD_QUEUE_DONE", payload: result })
    // yield put({ type: "REQUEST_SUCCESSFUL"})
  }
}

export function* callUpdateAddQueue(action) {
  const { queueId, scheduleId, queueName } = action.payload
  console.log("queueId", queueId);
  
  const result = yield call(submitUpdateQueueToServer, { id: queueId, data: { name: queueName, scheduleId } })

  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "REQUEST_ADD_QUEUE_DONE", payload: result})
    // yield put({ type: "REQUEST_SUCCESSFUL"})
  }
}
