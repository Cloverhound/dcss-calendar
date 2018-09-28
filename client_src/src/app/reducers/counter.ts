const counter = (state = [], action) => {
  
  switch (action.type) {
    case 'INCREMENT_COUNTER':
    console.log("INCREMENT");
    
      return [
        ...state
      ]
    default:
      return state
  }
}

export default counter