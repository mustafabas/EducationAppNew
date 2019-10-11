import React, { Component } from "react";
import {
  View,
  // Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { controlUsername } from "../../../redux/actions/signupActions";
import {  Button, FloatingLabelInput } from "../../../components";
import {Input,Text} from 'react-native-elements'
import styles from "../../AuthScreens/Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { UserState } from '../../../redux/reducers/SignUpReducers'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  controlUsername : (username : string) => void;
  username: string;
  userState : UserState;
}



 




const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required()

});

class SignUpFirstScreen extends Component<Props, {}> {
  handleLogin = (username: string) => {
    const { navigation } = this.props;
    controlUsername(username);
    navigation.navigate("SignUpSecond");
  };

  componentDidMount(){
  }

  render() {
      console.log(this.props.username);

    return (
      <View style={[styles.container, {justifyContent:'flex-start',marginTop:50 }] }>
        <KeyboardAvoidingView

          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView  bounces={false}>
            <Formik
              initialValues={{ username: ""}}
              validationSchema={loginSchema}
              onSubmit={ (val)=> this.handleLogin(val.username)}
            >
              {props => {

                return (
                  <View style={{alignContent:'space-between'}}>
                    {/* <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View> */}
                    <Text h3  style={{fontFamily:'OpenSans-Regular', alignSelf: 'center', marginTop: 30}}> Kullanici Adi Olustur</Text>
                    <Text style={{ fontFamily:'OpenSans-Regular',alignSelf: 'center', marginTop: 5}}> Yeni hesabina bir kullanici adi belirle.</Text>
                    <View style={[styles.inputContainer,{padding:10,marginTop:20}]}>
                        
                      <Input
                        inputStyle={{fontFamily:'OpenSans-Regular',fontSize:15}}
                        placeholder="Username"
                        style={{fontFamily:'OpenSans-Regular'}}
                        value={props.values.username}
                        onChangeText={props.handleChange("username")}
                        onBlur={props.handleBlur("username")}
                        // error={props.touched.username && props.errors.username}
                        errorMessage= "Lutfen uygun bir kullanici adi girin"
                        errorStyle={{height: (props.touched.username && props.errors.username) ? 20 : 0}}
                        
                      />
                     
                      
                        <Button  text="Continue" onPress={props.handleSubmit} />
                        
                       
                      
                      
                    </View>

                    
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state : AppState) => ({
  username : state.signup.username
})

export default connect(mapStateToProps,{controlUsername})(SignUpFirstScreen);



