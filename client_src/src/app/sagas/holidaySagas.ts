import { call, put } from 'redux-saga/effects'
import { getHolidayLists, createHolidayList, getHolidayList, updateHolidayList, deleteHolidayList } from './api-holidays'
import {  submitDeleteHolidayListToServerSucceeded, 
          submitDeleteHolidayListToServerFailed, 
          getHolidayListsFromServerSucceeded, 
          getHolidayListsFromServerFailed, 
          submitNewHolidayListToServerSucceeded, 
          submitNewHolidayListToServerFailed,  
          submitUpdateHolidayListToServerSucceeded, 
          submitUpdateHolidayListToServerFailed, 
          getHolidayListFromServerFailed, 
          getHolidayListFromServerSucceeded 
        } from '../actions'



export function* callCreateHolidayList(action) {
  const result = yield call(createHolidayList, action.payload)
  if (result.error) {
    yield put(submitNewHolidayListToServerFailed(result.error))
  } else {
    yield put(submitNewHolidayListToServerSucceeded(result))
  }
}


export function* callGetHolidayLists() {
  const result = yield call(getHolidayLists)
  if (result.error) {
    yield put(getHolidayListsFromServerFailed(result.error))
  } else {
    yield put(getHolidayListsFromServerSucceeded(result))
  }
}


export function* callGetHolidayList(action) {
  const result = yield call(getHolidayList, action.payload)
  if (result.error) {
    yield put(getHolidayListFromServerFailed(result.error))
  } else {
    yield put(getHolidayListFromServerSucceeded(result))
  }
}


export function* callUpdateHolidayList(action) {
  const result = yield call(updateHolidayList, action.payload)
  console.log('result', result)
  if (result.error) {
    console.log('yes error')
    yield put(submitUpdateHolidayListToServerFailed(result.error))
  } else {
    yield put(submitUpdateHolidayListToServerSucceeded(result))
  } 
}


export function* callDeleteHolidayList(action) {
  const result = yield call(deleteHolidayList, action.payload)
  if (result.error) {
    yield put(submitDeleteHolidayListToServerFailed(result.error))
  } else {
    yield put(submitDeleteHolidayListToServerSucceeded(result))
  } 
}

