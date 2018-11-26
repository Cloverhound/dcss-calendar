import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { getQueues } from './api'

export function* callGetQueues() {
  const result = yield call(getQueues);
  
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "GET_QUEUES_FROM_SERVER_DONE", payload: result})
  }
}