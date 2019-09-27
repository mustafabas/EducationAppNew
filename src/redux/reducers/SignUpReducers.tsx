import { CONTROL_USERNAME } from "../actions/signupActions";
interface Action {
  type: string;
  payload: any;
}
export interface UserState {
  username: string;
  password : string;

}

const intialState = {
  username : '',
  password : ''
};

export default (state: UserState = intialState, action: Action) => {
  switch (action.type) {
    case CONTROL_USERNAME:
      return {
        ...state,
        username: action.payload.username
      };
    
    default:
      return state;
  }
};
