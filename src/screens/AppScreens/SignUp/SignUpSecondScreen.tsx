import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform, TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { registerNewUser } from "../../../redux/actions/signupActions";
import { Input, Button, FloatingLabelInput } from "../../../components";
import styles from "../../AuthScreens/Login/styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface userData {
  password: string;

}

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required()
});

class SignUpSecondScreen extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const { navigation } = this.props;
    registerNewUser(values.password).then(res => {
      navigation.navigate("AppStack");
    });
  };

  render() {
    return (
      <View style={[styles.container, {justifyContent:'flex-start' }] }>
        <KeyboardAvoidingView

          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView  bounces={false}>
            <Formik
              initialValues={{ password: ""}}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                console.log(props, "fdsfsdfdsf");
                return (
                  <View style={{alignContent:'space-between'}}>
                    {/* <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View> */}
                    <Text style={{fontSize: 30, alignSelf: 'center', marginTop: 30}}> Bir parola Olustur</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 5}}> Yeni hesabina bir sifre belirle.</Text>
                    <View style={styles.inputContainer}>
                        
                      <Input
                        placeholder="password"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        error={props.touched.password && props.errors.password}
                      />
                     
                      
                        <Button text="Finish" onPress={props.handleSubmit} />
                        
                       
                      
                      
                    </View>
                    <View style={{alignItems:'center',marginTop:20}}>

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

export default SignUpSecondScreen;
