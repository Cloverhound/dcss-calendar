import { call, put } from 'redux-saga/effects'
import { createPrompt, getPrompts, getPromptsWithQueueId, getPrompt } from './api-prompts'
import { Result } from 'range-parser';

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
    console.log("prompt result", result)
  }
}

export function* callGetPromptsWithQueueId(action) {
  const result = yield call(getPromptsWithQueueId, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield put({type:"UPDATE_PROMPTS", payload: result})
    console.log("prompt result", result)
  }
}

export function* callCreatePrompt(action) {
  const result = yield call(createPrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    console.log("prompt result", result)
  }
}

