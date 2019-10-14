import { ICourseItem } from "./course/coruseItem";

export interface UserState {
  isLoading: boolean;
  isFinished: boolean;
  isSucceed: boolean;

}
export interface HomeState {
  courses: ICourseItem[];
  loading: boolean;
}

