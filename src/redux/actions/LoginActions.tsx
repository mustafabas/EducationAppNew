import { AsyncStorage } from "react-native";
import axios from 'axios'
import {EDU_API_LOGIN } from '../../constants'
import { Dispatch } from "react";
import {LOGIN_FAILED,LOGIN_STARTED,LOGIN_SUCCEED } from './types'
import { navigate } from '../Services/Navigator';
import {Action} from '../reducers/LoginReducers'


export function controlUsername(username: string) {
return new Promise((resolve,reject) => {
  //control username if its exist 

});
}




export const loginUserService = (username: string, password: string) =>{
    return (dispatch : Dispatch)=>{
        dispatch({
          type:LOGIN_STARTED,
        }); 
  console.log(username+password)
  return axios.post(EDU_API_LOGIN, {
    username: username,
    password: password
  })
  .then((response) =>{
  if(response.data.isSuccess){
    console.log("succeed")
    AsyncStorage.setItem("userToken", response.data.result.token)
    .then(() => {           
    })
    .catch(error => {      
    });
  }
  })
  .catch((err) => {
    console.log("notsuccessfull") 
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
