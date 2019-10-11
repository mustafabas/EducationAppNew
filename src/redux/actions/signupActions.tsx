import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {CONTROL_USERNAME} from './types'



// export const DATA_LOADING = "DATA_LOADING";
// export const FETCH_MORE = "FETCH_MORE";

var username2 : String

export function controlUsername(username: string) {

    return (dispatch: Dispatch) => {
      console.log("username3" + username)
      dispatch({
        type: CONTROL_USERNAME,
        payload: username
      });
      

      username2 = username
      
      console.log("username2" + username2)
    };




  }
    

export function registerNewUser(password : string) {
  return new Promise((resolve,reject) => {
    //register new user

  });
}
    