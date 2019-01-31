import { combineReducers } from 'redux'
import counter from './counter';
import routeComponent from './routeComponent';
import schedulesReducer from './SchedulesReducer';
import scheduleReducer from './ScheduleReducer';
import queuesReducer from './QueuesReducer';
import queueReducer from './QueueReducer'
import holidayListsReducer from './HolidayListsReducer'
import holidayListReducer from './HolidayListReducer'
import promptsReducer from './PromptsReducer'
import lcsasReducer from './LcsasReducer'
​
export default combineReducers({
  counter,
  routeComponent,
  scheduleReducer,
  schedulesReducer,
  queuesReducer,
  queueReducer,
  holidayListsReducer,
  holidayListReducer,
  promptsReducer,
  lcsasReducer
})