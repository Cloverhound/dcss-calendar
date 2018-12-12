let initialState = {
  targetFile: '',
  office_directions: [],
  optional_announcements: []
}

const promptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TARGET_FILE':
      return {...state, targetFile: action.payload.targetFile}
    default:
      return state
  }
}

export default promptsReducer;