import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import AuthLoading from "../screens/AuthLoading";
import SignUpFirstScreen from '../screens/AppScreens/SignUp/SignUpFirstScreen'
import SignUpSecondScreen from '../screens/AppScreens/SignUp/SignUpSecondScreen'
import CourseDetail from '../screens/AppScreens/Home/CourseDetail'
import UserInfoScreen from "../screens/AppScreens/User/UserInfoScreen";
import HomeScreen from '../screens/AppScreens/Home/HomeScreen'
import VideoScreen from '../screens/AppScreens/Home/VideoScreen'
import SignUpSecondPhoneVerificationScreen from '../screens/AppScreens/SignUp/SignUpPhoneVerificationScreen'
const MainStack = createStackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: HomeScreen },
    CourseDetail : { screen :CourseDetail },
    UserInfo : {screen: UserInfoScreen}
  },
  {
    initialRouteName: "Home",
    // headerMode: "none",

  }
);




const EducationVideoStack = createStackNavigator({
  Home : HomeScreen,
  CourseDetail: { screen :CourseDetail },

  Video: VideoScreen

},{
  // headerMode:'none'
})



EducationVideoStack.navigationOptions = ( navigation:any ) => {

  let tabBarVisible = true;

  /*let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Video' ) {
      tabBarVisible = false
  }
*/
  return {
      tabBarVisible,
  }
}






const mainBottomTab = createBottomTabNavigator({
  Education : EducationVideoStack,
  UserInfo : {screen: UserInfoScreen}
},
{
  initialRouteName: "Education",
  // headerMode: "none"
}
);

const AuthStack = createStackNavigator(
  {
    
    Login: { screen: Login },
    SignUpFirst : SignUpFirstScreen,
    SignUpSecond : SignUpSecondScreen,
    SignUpSecondPhoneVerification : SignUpSecondPhoneVerificationScreen
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

// const SignUpStack = createStackNavigator(
//   { 
//     signUpFirst : {screen : SignUpFirstScreen},
//     signUpSecond : {screen : SignUpSecondScreen},

//   },
//   {
//     initialRouteName: "signUpFirst",
//     headerMode: "none"
//   }
  
  
// )

const AppStack = createDrawerNavigator(
  {
    MainStack: { screen: MainStack },
    Blank: { screen: Blank }
  },
  {
    drawerWidth: width - 50,
    drawerPosition: "left",
    contentComponent: props => <SideBar {...props} />
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,
      AppStack: AppStack,

      MainStack : MainStack,
      mainBottomTab: mainBottomTab,
      VideoScreen: VideoScreen
      
    },
    {
      initialRouteName: "AuthLoading",

    }
  )
);
