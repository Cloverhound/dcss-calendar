let initialState = {
  targetFile: '',
  prompts: [],
  optional_prompt_status: false,
  office_directions: [
   [ {
      id: undefined,
      index: 0,
      language: "English",
      name: "",
      type: "office directions",
      url: ""
    },
    {
      id: undefined,
      index: 1,
      language: "Spanish",
      name: "",
      type: "office directions",
      url: ""
    }]
  ],
  optional_announcements: [
    {
      id: undefined,
      index: 0,
      language: "English",
      name: "",
      type: "optional announcements",
      url: ""
    },
    {
      id: undefined,
      index: 1,
      language: "Spanish",
      name: "",
      type: "optional announcements",
      url: ""
    }
  ],
  office_directions_initial: [
    {
      id: undefined,
      index: 0,
      language: "English",
      name: "",
      type: "office directions",
      url: ""
    },
    {
      id: undefined,
      index: 1,
      language: "Spanish",
      name: "",
      type: "office directions",
      url: ""
    }
  ],
  optional_announcements_eng: {},
  optional_announcements_span: {},
  optional_announcements_eng_initial:
  {
    id: undefined,
    language: "English",
    name: "",
    type: "optional announcements",
    url: ""
  },
  optional_announcements_span_initial:
  {
    id: undefined,
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

    case 'ADD_OFFICE_PROMPTS':
      let newArray: any[] = [...state.office_directions];
      let index = state.office_directions.length - 1
      let initialArray: any[] = JSON.parse(JSON.stringify(state.office_directions_initial))
      
      initialArray.forEach(obj => {
        index += 1
        obj.index = index
        newArray.push(obj)
      })
      return {...state, office_directions: newArray}

    case 'UPDATE_PROMPTS':
    let office_directions: any[] = [];
    action.payload.forEach(prompt => {
      if(prompt.type === "office directions") {
        office_directions.push(prompt)
      }
    })
    office_directions.sort((a,b) => a.index - b.index)

    let nested_office_directions = []
    if(office_directions.length){
      for(let i = 0; i < office_directions.length; i+2) {
        nested_office_directions.push(office_directions.splice(0,2))
      }
    }

    let optional_announcements_eng = action.payload.find(prompt => prompt.type === "optional announcements" && prompt.language === "English")
    let optional_announcements_span = action.payload.find(prompt => prompt.type === "optional announcements" && prompt.language === "Spanish")
    !nested_office_directions.length ? nested_office_directions = state.office_directions_initial : null
    !optional_announcements_eng ? optional_announcements_eng = state.optional_announcements_eng_initial : null
    !optional_announcements_span ? optional_announcements_span = state.optional_announcements_span_initial : null
    return {
              ...state,
              office_directions: [...nested_office_directions],
              ...(optional_announcements_eng && {optional_announcements_eng}),
              ...(optional_announcements_span && {optional_announcements_span}),
            }
    default:
      return state
  }
}

export default promptsReducer;