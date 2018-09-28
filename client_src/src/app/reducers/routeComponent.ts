import Queues from '../components/Queues/Queues';

const routeComponent = (state = Queues, action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE_COMPONENT':
      return action.payload
    default:
      return state
  }
}

export default routeComponent