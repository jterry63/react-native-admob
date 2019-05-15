import React from "react";
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common";
import firebase from "firebase";
import { Text, ImageBackground, TouchableOpacity, View, Alert, StyleSheet, TextInput, KeyboardAvoidingView, InputAccessoryView, Keyboard  } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'Forgot Password',
  };

  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    loginBtn: "Log In",
    forgotPassword: "Forgot Password?",
    haveAccount: "Don't have an account yet?",
    signUp: "Sign Up",
    showSignUp: "none",
    loggedIn: null,
    name: "",
    newUser: false,
    emailAddress: ''
  };

  passwordReset() {
    
    let auth = firebase.auth();
    let emailAddress = this.state.emailAddress;
    
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log('email sent');
      this.returnToLogin();
    }).catch(function(error) {
      console.log(error);
    });

    Alert.alert(
      'Success!',
      'Your reset password email has been sent',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate("Login")},
      ],
      {cancelable: false},
    );

    
    
  }

  render() {
    const inputAccessoryViewID = "uniqueID";
    return (
   
      <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
    <View>
          <Text style={styles.logo}>
            Charity{"\n"}Ads
          </Text>
        </View>
    <Card>
        <CardSection>
          
          <Text
            style={{
              fontSize: 20,
              color: "rgba(255,255,255, 0.6)",
              marginRight: 10,
              marginTop: 10
            }}
          />
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            label="passwordReset"
            placeholder="What is your email address?"
            placeholderTextColor='rgba(255,255,255, 0.9)'
            value={this.state.emailAddress}
            onChangeText={emailAddress => this.setState({ emailAddress })}
            inputAccessoryViewID={inputAccessoryViewID}
            keyboardType={"email-address"}
            returnKeyType={"send"}
            onSubmitEditing={this.passwordReset.bind(this)}
          />
         
        </CardSection>

        <CardSection>
            <Button onPress={this.passwordReset.bind(this)}>Send</Button>
        </CardSection>

        <CardSection>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Return to login
            </Text>
          </TouchableOpacity>
        </CardSection>


{/* custom button for keyboard dismissal ---------------------------- */}
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <TouchableOpacity 
            style={{backgroundColor: 'transparent', height: 25, justifyContent: 'center'}}
            onPress={Keyboard.dismiss}
            >
            <Text style={{ textAlign: 'center'}}>

            <Ionicons name="ios-arrow-down" size={30} color="white" />
            
            </Text>
            
            
          </TouchableOpacity>
        </InputAccessoryView>
{/* ------------------------------------------------------------------- */}


</Card>
        

        </KeyboardAvoidingView>
    
    

    )
    
    
    
    ;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23accd',
    justifyContent: "center"
    },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "white"
  },
  logo: {
    fontFamily: 'adlery',
    color: 'white',
    fontSize: 80,
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 60

  },
  inputStyle: {
    color: 'white',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255, 0.3)',
    paddingRight: 5,
    paddingLeft: 25,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    height: 40,
    borderRadius: 25 
}
});