import { action } from 'typesafe-actions';
import { ADD_ARTICLE } from "../constants/action-types";

// export type State = {
//   readonly articles: Array<string>;
// };

// export const initialState: State = {
//   articles: []
// };

const initialState = {
  articles: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.payload] };
    default:
      return state;
  }
};
export default rootReducer;