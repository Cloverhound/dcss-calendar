import { call, put } from 'redux-saga/effects'
import { getLcsas, createLcsa, deleteLcsa, lcsaToggle} from './api-lcsas'

export function* callGetLcsas() {
  yield put({type: "LCSA_LOADING"})
  const result = yield call(getLcsas)

  if (result.error) {
    yield put({type: "GET_LCSAS_FROM_SERVER_FAILED", payload: result})
  } else {
    yield put({type: "GET_LCSAS_FROM_SERVER_SUCCEEDED", payload: result})
  }
}

export function* callCreateLcsa(action) {
  const { lcsa_id, history } = action.payload
  yield put({type: "LCSA_LOADING"})

  const result = yield call(createLcsa, { lcsa_id: lcsa_id })
  
  if (result.error) {
    yield put({type: "SUBMIT_NEW_LCSA_TO_SERVER_FAILED", payload: result})
  } else {
    yield put({type: "SUBMIT_NEW_LCSA_TO_SERVER_SUCCEEDED"})
    yield call([history, history.push], '/lcsas')
  }
}

export function* callDeleteLcsa(action) {
  console.log('Call Delete Lcsa', action.payload)
  const result = yield call(deleteLcsa, action.payload.id);
  
  if (result.error) {
    yield put({type: "SUBMIT_DELETE_LCSA_TO_SERVER_FAILED", payload: result.error})
  } else {
    yield call(callGetLcsas)
    yield put({type: "SUBMIT_DELETE_LCSA_TO_SERVER_SUCCEEDED", payload: result})
  }
}

export function* callLcsaToggle(action) {
  const result = yield call(lcsaToggle, action.payload);
  if (result.error) {
    yield put({type: "SUBMIT_LCSA_TOGGLE_TO_SERVER_FAILED", payload: result.error})
  } else {
    yield call(callGetLcsas)
    // yield put({type: "SUBMIT_LCSA_TOGGLE_TO_SERVER_SUCCEEDED", payload: result})
  }
}
