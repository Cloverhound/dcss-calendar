import { combineReducers } from 'redux'
import counter from './counter';
import routeComponent from './routeComponent';
import scheduleSelect from './scheduleSelect';
​
export default combineReducers({
  counter,
  routeComponent,
  scheduleSelect
})