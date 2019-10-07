import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";

export const CONTROL_USERNAME = "controlUsername";


// export const DATA_LOADING = "DATA_LOADING";
// export const FETCH_MORE = "FETCH_MORE";

var username2 : String

export function controlUsername(username: string) {
  console.log("username3" + username)

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
    