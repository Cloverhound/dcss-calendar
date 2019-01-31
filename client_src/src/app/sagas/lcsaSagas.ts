import { call, put } from 'redux-saga/effects'
import { getLcsas, createLcsa } from './api-lcsas'

export function* callGetLcsas(action) {
  // yield put(queueLoading())
  const result = yield call(getLcsas, action.payload)
  console.log('result', result);
  
  if (result.error) {
    // yield put(getQueueFromServerFailed(result.error))
    // yield put(getQueueFromServerFailed(result.error))
  } else {
    yield put({type: "GET_LCSAS_FROM_SERVER_SUCCEEDED", payload: result})
  }
}

export function* callCreateLcsa(action) {
  const { lcsa_id, history } = action.payload
  // yield put(queueLoading())

  const result = yield call(createLcsa, { lcsa_id: lcsa_id })
  console.log('result', result);
  
  if (result.error) {
    // yield put(submitNewQueueToServerFailed(result.error))
  } else {
    // yield put(submitNewQueueToServerSucceeded(result))
    yield call([history, history.push], '/lcsas')
  }
}