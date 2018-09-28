import Home from '../components/Home/Home'

const routeComponent = (state = Home, action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE_COMPONENT':
      return action.payload
    default:
      return state
  }
}

export default routeComponent