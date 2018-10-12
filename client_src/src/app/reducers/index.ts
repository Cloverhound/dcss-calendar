import { combineReducers } from 'redux'
import counter from './counter';
import routeComponent from './routeComponent';
import scheduleSelect from './scheduleSelect';
import QueuesReducer from './QueuesReducer';
​
export default combineReducers({
  counter,
  routeComponent,
  scheduleSelect,
  QueuesReducer
})