
import { AsyncStorage } from "react-native";
import axios from 'axios'
import { EDU_API_LOGIN, EDU_API_COURSES } from '../../../constants'
import { Dispatch } from "react";
import { HOME_LOADING, HOME_GET_COURSE } from './../types'
import { Action } from "redux";
import { ICourseItem } from "../../../models/course/coruseItem";
import { ICourseItemRequest } from "../../../models/course/courseItemRequest";


export function CourseHomeListData(){
    return (dispatch: Dispatch<Action>) => {
        
             dispatch(loading());

              axios.get(EDU_API_COURSES+"?id=1"
                )
  .then((response) =>{
      if(response.data.isSuccess){
        let courseItems : ICourseItem[] =[];

        response.data.result!.forEach((element:ICourseItemRequest) => {
            courseItems!.push(
                ({
                    id:element.courseTopicId,
                    name:element.topicName,
                    content:element.content,
                    displayPrice:element.priceDisplayName
                }
            ));
       
        });
        dispatch(homeDatas(courseItems));
      }

        
  });
    };
};


export const loading = () => ({
    type: HOME_LOADING,
    payload: true
})

export const homeDatas = (response:ICourseItem[]) => ({
    type: HOME_GET_COURSE,
    payload: response
})
