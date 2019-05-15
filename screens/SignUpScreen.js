import React from "react";
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common";
import firebase from "firebase";
import { Text, ImageBackground, TouchableOpacity, View, StyleSheet, Alert, TextInput, KeyboardAvoidingView, InputAccessoryView, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: "SignUp"
  };

  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    loginBtn: "Sign Up",
    haveAccount: "Don't have an account yet?",
    signUp: "Sign Up",
    showSignUp: "none",
    loggedIn: null,
    first: "",
    last: "",
    newUser: false,
    showPasswordReset: "none",
    emailAddress: '',
    inputEditable: true
  };
  

  onButtonPress() {


    if (this.state.password.length < 6) {
      this.passwordFail();
    }

    if (this.state.email === "" || this.state.first === "" | this.state.last === "") {
      this.fieldMissing();
    }

    
    else {

    const { email, password } = this.state;

    this.setState({ error: "", loading: true, inputEditable: false });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .then(this.updateProfile.bind(this))
      .catch(this.onLoginFail.bind(this));
    }
  }

  passwordFail() {
    this.setState({
      loading: false,
      inputEditable: true
    })
    Alert.alert(
      'Please try again...',
      'Your password must be at least 6 characters',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate("Sign Up")},
      ],
      {cancelable: false},
    );
  }

  fieldMissing() {
    this.setState({
      loading: false,
      inputEditable: true
    })
    Alert.alert(
      'Please try again...',
      'All fields are required. Please finish filling out each item before signing up',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate("Sign Up")},
      ],
      {cancelable: false},
    );
  }


  onLoginFail() {
    this.setState({
      error: "",
      loading: false,
      inputEditable: true
    });
    Alert.alert(
      'Please try again...',
      'This email address is already in use. Please choose a different email address',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate("Sign Up")},
      ],
      {cancelable: false},
    );
  }

  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
  }

  onSignUpClick() {
    this.setState({
      haveAccount: "",
      signUp: "",
      showSignUp: "block"
    });
  }

  updateProfile() {
    var user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: this.state.first + " " + this.state.last,
        photoURL: "https://i.imgur.com/WMy7Wid.png"
      })
      .then(function() {
        console.log(user);
      })
      .then(this.setState({ newUser: true }))
      .then(this.props.navigation.navigate("NewUser"))
      .catch(function(error) {
        // An error happened.
      });
  }


  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        {this.state.loginBtn}
      </Button>
    );
  }

  render() {
    const inputAccessoryViewID = "uniqueID";
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text style={styles.logo}>
            Charity{"\n"}Ads
          </Text>
        </View>
        <Card>
          <View>
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
                label="firstName"
                placeholder="First Name"
                placeholderTextColor='rgba(255,255,255, 0.9)'
                value={this.state.first}
                onChangeText={first => this.setState({ first })}
                editable={this.state.inputEditable}
                returnKeyType={"next"}
                blurOnSubmit={false}
                onSubmitEditing={() => this.lastNameRef.focus()}
                inputAccessoryViewID={inputAccessoryViewID}
                
              />
            </CardSection>
          </View>

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
              label="lastName"
              placeholder="Last Name"
              placeholderTextColor='rgba(255,255,255, 0.9)'
              value={this.state.last}
              onChangeText={last => this.setState({ last })}
              editable={this.state.inputEditable}
              ref={ref => this.lastNameRef = ref} 
              returnKeyType={"next"}
              blurOnSubmit={false}
              onSubmitEditing={() => this.emailRef.focus()}
              inputAccessoryViewID={inputAccessoryViewID}
            />
          </CardSection>

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
              label="Email"
              placeholder="Email"
              placeholderTextColor='rgba(255,255,255, 0.9)'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              editable={this.state.inputEditable}
              ref={ref => this.emailRef = ref} 
              returnKeyType={"next"}
              blurOnSubmit={false}
              onSubmitEditing={() => this.passwordRef.focus()}
              inputAccessoryViewID={inputAccessoryViewID}
            />
          </CardSection>

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
              secureTextEntry
              label="Password"
              placeholder="Password (6 character minimum)"
              placeholderTextColor='rgba(255,255,255, 0.9)'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              editable={this.state.inputEditable}
              ref={ref => this.passwordRef = ref} 
              returnKeyType={"go"}
              blurOnSubmit={false}
              onSubmitEditing={this.onButtonPress.bind(this)}
              inputAccessoryViewID={inputAccessoryViewID}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <CardSection>{this.renderButton()}</CardSection>

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
            style={{backgroundColor: '#23accd', height: 25, justifyContent: 'center'}}
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
    );
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