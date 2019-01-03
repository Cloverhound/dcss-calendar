let initialState = {
  targetFile: '',
  prompts: [],
  office_directions: [
    {
      id: undefined,
      enabled: false,
      language: "English",
      name: "",
      type: "office directions",
      url: ""
    },
    {
      id: undefined,
      enabled: false,
      language: "Spanish",
      name: "",
      type: "office directions",
      url: ""
    }
  ],
  optional_announcements: [
    {
      id: undefined,
      enabled: false,
      language: "English",
      name: "",
      type: "optional announcements",
      url: ""
    },
    {
      id: undefined,
      enabled: false,
      language: "Spanish",
      name: "",
      type: "optional announcements",
      url: ""
    }
  ],
  office_directions_eng: {},
  office_directions_span: {},
  optional_announcements_eng: {},
  optional_announcements_span: {},
  office_directions_eng_initial: 
  {
    id: undefined,
    enabled: false,
    language: "English",
    name: "",
    type: "office directions",
    url: ""
  },
  office_directions_span_initial:
  {
    id: undefined,
    enabled: false,
    language: "Spanish",
    name: "",
    type: "office directions",
    url: ""
  },
  optional_announcements_eng_initial:
  {
    id: undefined,
    enabled: false,
    language: "English",
    name: "",
    type: "optional announcements",
    url: ""
  },
  optional_announcements_span_initial:
  {
    id: undefined,
    enabled: false,
    language: "Spanish",
    name: "",
    type: "optional announcements",
    url: ""
  }
}

const promptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TARGET_FILE':
      return {...state, targetFile: action.payload.targetFile}

    case 'UPDATE_PROMPTS':
    console.log("action.payload", action.payload)
    let office_directions: any[] = [];
    let optional_announcements = [];
    action.payload.forEach(prompt => {
      if(prompt.type === "office directions") {
        office_directions.push(prompt)
      }
    })
    office_directions.sort((a,b) => a.id - b.id)
    console.log("office_directions", office_directions)
    let optional_announcements_eng = action.payload.find(prompt => prompt.type === "optional announcements" && prompt.language === "English")
    let optional_announcements_span = action.payload.find(prompt => prompt.type === "optional announcements" && prompt.language === "Spanish")
    // !office_directions_eng ? office_directions_eng = state.office_directions_eng_initial : null
    // !office_directions_span ? office_directions_span = state.office_directions_span_initial : null
    !optional_announcements_eng ? optional_announcements_eng = state.optional_announcements_eng_initial : null
    !optional_announcements_span ? optional_announcements_span = state.optional_announcements_span_initial : null
      return {
              ...state,
              office_directions,
              // ...(office_directions_eng && {office_directions_eng}),
              // ...(office_directions_span && {office_directions_span}),
              ...(optional_announcements_eng && {optional_announcements_eng}),
              ...(optional_announcements_span && {optional_announcements_span}),
            }
    default:
      return state
  }
}

export default promptsReducer;