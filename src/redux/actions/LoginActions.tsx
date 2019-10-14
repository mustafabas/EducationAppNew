import { AsyncStorage } from "react-native";
import axios from 'axios'
import {EDU_API_LOGIN } from '../../constants'
import { Dispatch } from "react";
import {LOGIN_FAILED,LOGIN_STARTED,LOGIN_SUCCEED ,RESET_PROPS} from './types'
import { navigate } from '../services/Navigator';
import { Action } from "../../models/action";

export function loginUserService(email: string, password: string) {

  return (dispatch : Dispatch<Action>) =>  {
    console.log("asdasd" + email+password)
    dispatch(loading(true));

    // dispatch({
    //   type:LOGIN_STARTED,
    // });   

  axios.post(EDU_API_LOGIN, {
    username: email,
    password: password
  })
  .then((response) =>{
  if(response.data.isSuccess){
    
    AsyncStorage.setItem("userToken", response.data.result.token)
    .then(() => {       
      // dispatch(loading(false)); 
      
    
      dispatch(loginIsSucceed(true)); 
      console.log("succeed");
      dispatch(reset());

      
    })
    .catch(error => { 
      
      console.log(error + 'errorr kaydetme asn storage')   
      // dispatch(loading(false));
      dispatch(loginIsSucceed(false));
      dispatch(reset());
    });
  }
  else {

    dispatch(loginIsSucceed(false));
    dispatch(reset());
  }
  })
  .catch((err) => {
    console.log(err + "error axios") 
    // dispatch(loading(false));
    
    dispatch(loginIsSucceed(false));
    dispatch(reset());
  });


  }

}

export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("userToken")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}


export const loading = (loader : boolean) => ({
  type : LOGIN_STARTED,
  payload : loader
})


export const loginIsSucceed = (loginIsSucced : boolean) => ({
  type : loginIsSucced ? LOGIN_SUCCEED : LOGIN_FAILED,
  payload : null
})


export const reset = () => ({
  type : RESET_PROPS,
  payload:null
})
