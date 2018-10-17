import { call, put, takeEvery, takeLatest, fork, all } from 'redux-saga/effects'
import { submitScheduleToServer, getAllQueues } from './api'

export function* callGetQueues() {
  const result = yield call(getAllQueues);
  
  if (result.error) {
    console.log("REQUEST_FAILED", result.error)
  } else {
    console.log("REQUEST_SUCCESSFUL")
    yield put({type: "REQUEST_GET_QUEUES_DONE", payload: result})
  }
}