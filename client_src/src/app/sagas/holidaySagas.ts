import { call, put } from 'redux-saga/effects'
import { getAllHolidayLists, submitHolidayListToServer } from './api'

export function* callNewHolidayListSubmit(action) {
  console.log('Calling Holidays Submit', action)

  const result = yield call(submitNewHolidayListToServer, action.payload)

  if (result.error) {
    console.log("HOLIDAYS_SUBMIT_REQUEST_FAILED", result.error)
    // yield put({ type: "REQUEST_FAILED", result: result.errors })
  } else {
    console.log("HOLIDAYS_SUBMIT_REQUEST_SUCCESSFUL")
    // yield put({ type: "REQUEST_SUCCESSFUL"})
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

