import { call, put } from 'redux-saga/effects'
import { updatePrompt, getPrompts, getPromptsWithQueueId, getPrompt, deletePrompt, createPrompts, clearPrompt, deletePromptRows } from './api-prompts'

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
  const {history, id} = action.payload
  
  const result = yield call(getPromptsWithQueueId, id)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    if(result.length){
      yield put({type:"UPDATE_PROMPTS", payload: result})
    }
    yield call([history, history.push], `/prompts/${id}/edit`)
    console.log("callGetPromptsWithQueueId result", result)
  }
}

export function* callUpdatePrompt(action) {
  const result = yield call(updatePrompt, action.payload)
  if (result.error) {
    yield put({type: "SUBMIT_UPDATE_PROMPT_TO_SERVER_FAILED", payload: result.error})
  } else {
    yield put({type: "SUBMIT_UPDATE_PROMPT_TO_SERVER_SUCCEEDED", payload: result.res})
    yield call(callGetPromptsWithQueueId, {payload: result.res.queueId})
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

export function* callCreatePrompts(action) {
  const result = yield call(createPrompts, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield call(callGetPromptsWithQueueId, {payload: result.status[0].queueId})
    console.log("callCreatePrompts result", result)
  }
}

export function* callClearPrompt(action) {
  const result = yield call(clearPrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
    yield put({type: "SUBMIT_CLEAR_PROMPT_TO_SERVER_FAILED", payload: result.error})
  } else {
    yield call(callGetPromptsWithQueueId, {payload: result.status.queueId})
    yield put({type: "SUBMIT_CLEAR_PROMPT_TO_SERVER_SUCCEEDED", payload: result.status.name})
    console.log("callClearPrompts result", result)
  }
}

export function* callDeletePromptRows(action) {
  const result = yield call(deletePromptRows, action.payload.rows)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    yield call(callGetPromptsWithQueueId, {payload: action.payload.queueId})
    console.log("callCDeletePrompts result", result)
  }
}

