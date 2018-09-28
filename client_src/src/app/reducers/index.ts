import { combineReducers } from 'redux'
import counter from './counter';
import routeComponent from './routeComponent'
​
export default combineReducers({
  counter,
  routeComponent
})