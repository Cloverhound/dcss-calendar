let initialState = {
  targetFile: '',
  prompts: [],
  office_directions_eng:
  {
    id: undefined,
    enabled: false,
    language: "English",
    name: "",
    type: "office directions",
    url: "",
  },
  office_directions_span:
  {
    id: undefined,
    enabled: false,
    language: "Spanish",
    name: "",
    type: "office directions",
    url: ""
  },
  optional_announcements_eng:
  {
    id: undefined,
    enabled: false,
    language: "English",
    name: "",
    type: "optional announcements",
    url: ""
  },
  optional_announcements_span:
  {
    id: undefined,
    enabled: false,
    language: "Spanish",
    name: "",
    type: "optional announcements",
    url: ""
  },
}

const promptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TARGET_FILE':
      return {...state, targetFile: action.payload.targetFile}
    case 'UPDATE_PROMPTS':
      let office_directions_eng = action.payload.find(prompt => prompt.type === "office directions" && prompt.language === "English")
      let office_directions_span = action.payload.find(prompt => prompt.type === "office directions" && prompt.language === "Spanish")
      let optional_announcements_eng = action.payload.find(prompt => prompt.type === "optional announcements" && prompt.language === "English")
      let optional_announcements_span = action.payload.find(prompt => prompt.type === "optional announcements" && prompt.language === "Spanish")
      return {
              ...state, prompts: action.payload, 
              ...(office_directions_eng && {office_directions_eng}),
              ...(office_directions_span && {office_directions_span}),
              ...(optional_announcements_eng && {optional_announcements_eng}),
              ...(optional_announcements_span && {optional_announcements_span}),
            }
    default:
      return state
  }
}

export default promptsReducer;