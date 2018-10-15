import { combineReducers } from 'redux'
import counter from './counter';
import routeComponent from './routeComponent';
import scheduleReducer from './SchedulesReducer';
import queuesReducer from './QueuesReducer';
​
export default combineReducers({
  counter,
  routeComponent,
  scheduleReducer,
  queuesReducer
})