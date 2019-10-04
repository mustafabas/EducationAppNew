import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity,Image, StatusBar
} from "react-native";
import { NavigationScreenProp, NavigationState ,SafeAreaView} from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { controlUsername } from "../../../redux/actions/signupActions";
import { Input, Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { UserState } from '../../../redux/reducers/SignUpReducers'
import DeviceInfo  from 'react-native-device-info';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
 
}



 




const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required()

});

class UserInfoScreen extends Component<Props, {}> {
 
componentWillMount(){
  DeviceInfo.hasNotch().then(hasNotch => {



  })

 
}
  render() {


    return (
      <SafeAreaView style={[styles.container] } >
        <StatusBar

translucent
barStyle="default"
backgroundColor="rgba(0, 0, 0, 0.251)"
/>

        <KeyboardAvoidingView

          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView  bounces={false} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
              <View style={{}}>
              <View style={{width:80,height:80,justifyContent:'center',alignItems:'center',borderRadius:40,
        shadowColor: '#E4E4E4',backgroundColor: '#E4E4E4',
        
        shadowOffset: {width: 3, height: 3 },
        shadowOpacity: .5,
    }}>
        <Image  source={require(`../../../assets/edu-1.jpg`)} style={{width: 70,height:70 ,resizeMode:'cover',borderRadius:35,}}></Image>
      
        </View>
        <TouchableOpacity style={{width:32,height:32,borderRadius:16,position:'absolute',left:50,bottom:50,justifyContent:'center',alignItems:'center',backgroundColor:'#E4E4E4'}}>
        <Icon size= {30} name="user"  style={{width:30,height:30,color:'white',backgroundColor:'purple' ,overflow:"hidden",borderRadius:15}}/>   
       
        </TouchableOpacity>
        <Button text="asdasd" onPress={()=> this.props.navigation.navigate('App')} /> 
        </View>
            {/* <Icon size={50} name="info"  style={{width:50,height:50,borderRadius:25, color:'white',backgroundColor:'purple' ,textAlign:'center',overflow:"hidden"}}/>   
            */}

 
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}



export default connect()(UserInfoScreen);



