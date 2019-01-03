import { call, put } from 'redux-saga/effects'
import { createPrompt, getPrompts, getPromptsWithQueueId, getPrompt, deletePrompt } from './api-prompts'

export function* callGetPrompts() {
  const result = yield call(getPrompts)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    console.log("prompt result", result)
  }
}

export function* callGetPrompt(action) {
  const result = yield call(getPrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    console.log("callGetPrompt result", result)
  }
}

export function* callGetPromptsWithQueueId(action) {
  const result = yield call(getPromptsWithQueueId, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield put({type:"UPDATE_PROMPTS", payload: result})
    console.log("callGetPromptsWithQueueId result", result)
  }
}

export function* callCreatePrompt(action) {
  const result = yield call(createPrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield call(callGetPrompts)
    yield call(callGetPromptsWithQueueId, {payload: result.res.queueId})
    console.log("callCreatePrompt result", result)
  }
}

export function* callDeletePrompt(action) {
  const result = yield call(deletePrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield call(callGetPromptsWithQueueId, {payload: result.status.queueId})
    console.log("callDeletePrompt result", result)
  }
}

