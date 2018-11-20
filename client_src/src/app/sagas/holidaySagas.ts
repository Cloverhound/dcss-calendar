import { call, put } from 'redux-saga/effects'
import { getAllHolidayLists, submitNewHolidayListToServer, getHolidayList, submitUpdateHolidayListToServer } from './api'

export function* callNewHolidayListSubmit(action) {
  console.log('Calling Holidays Submit', action)

  const result = yield call(submitNewHolidayListToServer, action.payload)

  if (result.error) {
    console.log("NEW_HOLIDAY_LIST_REQUEST_FAILED", result.error)
    // yield put({ type: "NEW_HOLIDAY_LIST_REQUEST_FAILED", result: result.errors })
  } else {
    console.log("NEW_HOLIDAY_LIST_REQUEST_SUCCESSFUL")
    // yield put({ type: "NEW_HOLIDAY_LIST_REQUEST_SUCCESSFUL"})
  }
}

export function* callGetHolidayLists() {
  const result = yield call(getAllHolidayLists)

  if (result.error) {
    console.log("GET_HOLIDAY_LISTS_REQUEST_FAILED", result.error)
  } else {
    console.log("GET_HOLIDAY_LISTS_REQUEST_SUCCESSFUL", result)
    yield put({ type: "GET_HOLIDAY_LISTS_REQUEST_SUCCESSFUL", payload: result})
  }

}

export function* callGetHolidayList(action) {
  console.log('Calling get holiday list method', action)
  const result = yield call(getHolidayList, action.payload)
  console.log('result', result)

  if (result.error) {
    console.log("GET_HOLIDAY_LIST_REQUEST_FAILED", result.error)
  } else {
    console.log("GET_HOLIDAY_LIST_REQUEST_SUCCESSFUL", result)
    yield put({ type: "GET_HOLIDAY_LIST_REQUEST_SUCCESSFUL", payload: result})
  }

}

export function* callUpdateHolidayListSubmit(action) {
  const result = yield call(submitUpdateHolidayListToServer, action.payload)

  if (result.error) {
    console.log("SUBMIT_UPDATE_HOLIDAY_LIST_REQUEST_FAILED", result.error)
  } else {
    console.log("SUBMIT_UPDATE_HOLIDAY_LIST_REQUEST_SUCCESSFUL", result)
    yield put({ type: "SUBMIT_UPDATE_HOLIDAY_LIST_REQUEST_SUCCESSFUL", payload: result})
  } 
}

