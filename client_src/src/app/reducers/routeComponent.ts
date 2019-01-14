const initialState = {
  route: ''
}

const routeComponent = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROUTE':
      let reg = /holiday_lists|schedules/
      let found = action.payload.url.match(reg)
      let name = ''
      found ? name = `/${found[0]}` : name = '/'
      return {...state, route: name}
    default:
      return state
  }
}

export default routeComponent