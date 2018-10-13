import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { submitScheduleToServer, getAllQueues } from './api'

export function* callGetQueues() {
  const result = yield call(getAllQueues);
  
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "REQUEST_GET_QUEUES_DONE", payload: result})
    // yield put({ type: "REQUEST_SUCCESSFUL"})
  }
}