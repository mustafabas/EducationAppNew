import { HOME_GET_COURSE, HOME_LOADING } from "../actions/types";
import { Action } from "../../models/action";
import { HomeState } from "../../models/state";

const intialState = {
  courses: [],
  loading: false
};

export default (state: HomeState = intialState, action: Action) => {
  switch (action.type) {
    case HOME_GET_COURSE:
      return { ...state, courses: action.payload };
    case HOME_LOADING:
      
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
