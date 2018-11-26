import { combineReducers } from 'redux'
import counter from './counter';
import routeComponent from './routeComponent';
import scheduleReducer from './SchedulesReducer';
import queuesReducer from './QueuesReducer';
import newQueueReducer from './newQueueReducer'
import holidayListsReducer from './HolidayListsReducer'
import holidayListReducer from './HolidayListReducer'
​
export default combineReducers({
  counter,
  routeComponent,
  scheduleReducer,
  queuesReducer,
  newQueueReducer,
  holidayListsReducer,
  holidayListReducer
})