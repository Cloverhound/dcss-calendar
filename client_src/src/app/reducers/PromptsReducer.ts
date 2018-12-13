let initialState = {
  targetFile: '',
  prompts: [],
  office_directions: [],
  optional_announcements: []
}

const promptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TARGET_FILE':
      return {...state, targetFile: action.payload.targetFile}
    case 'UPDATE_PROMPTS':
      return {...state}
    default:
      return state
  }
}

export default promptsReducer;