import { call, put } from 'redux-saga/effects'
import { createPrompt } from './api-prompts'

export function* callCreatePrompt(action) {
  const result = yield call(createPrompt, action.payload)
  if (result.error) {
    console.log("prompt error", result)
  } else {
    console.log("prompt result", result)
  }
}