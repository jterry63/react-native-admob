import React from "react";
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common";
import { FadeInView } from "../components/FadeInView";
import firebase from "firebase";
import { Text, ImageBackground, TouchableOpacity, View, StyleSheet, Alert, TextInput } from "react-native";

firebase.initializeApp({
    apiKey: "AIzaSyBFVFx_WPZzA2uQUP3zYcNp3Wtcn_HJROM",
    authDomain: "auth-523a5.firebaseapp.com",
    databaseURL: "https://auth-523a5.firebaseio.com",
    projectId: "auth-523a5",
    storageBucket: "auth-523a5.appspot.com",
    messagingSenderId: "142504376049"
  });

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login"
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
    loggedIn: null,
    name: "",
    showPasswordReset: "none",
    emailAddress: '',
    inputEditable: true
  };

  componentWillMount() {
  
    firebase.auth().onAuthStateChanged(user => {
      if (user && !this.state.newUser && user.photoURL) {
        console.log(user);
        this.props.navigation.navigate("Home");
      } else {
     
      }
    });
  }

  onButtonPress() {
    
    const { email, password } = this.state;

    this.setState({ error: "", loading: true, inputEditable: false });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
    
      // .catch(() => {
      //   firebase
      //     .auth()
      //     .createUserWithEmailAndPassword(email, password)
      //     .then(this.onLoginSuccess.bind(this))
      //     .then(this.updateProfile.bind(this))
      //     .catch(this.onLoginFail.bind(this));
      // });
}

  onLoginFail() {
    this.setState({
      // error: "Incorrect username or password",
      loading: false,
      inputEditable: true
    });
    Alert.alert(
      'Please try again...',
      'The email and password you entered did not match our records. Please double-check and try again.',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate("Login")},
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


  showSignUp() {
    this.props.navigation.navigate("SignUp")
  }

  showPasswordReset() {
    {this.props.navigation.navigate("ForgotPassword")}
  }

  updateProfile() {
    var user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: this.state.name,
      })
      .then(function() {
        console.log(user);
      })
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
    return (
    
      <View style={styles.container}>
        
        <FadeInView>
          <Text style={styles.logo}>
            Charity{"\n"}Ads
          </Text>
        </FadeInView>
        <Card>
          <CardSection>
            <Text
              style={{
                fontSize: 20,
                color: "rgba(255,255,255, 0.6)",
                marginRight: 10,
               
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
              keyboardType={"email-address"}
              returnKeyType={"next"}
              blurOnSubmit={false}
              onSubmitEditing={() => this.passwordRef.focus()}
 
            />
          </CardSection>

          <CardSection>
            <Text
              style={{
                fontSize: 20,
                color: "rgba(255,255,255, 0.6)",
                marginRight: 10,
            
              }}
            />
            <TextInput
              style={styles.inputStyle}
              secureTextEntry
              label="Password"
              placeholder="Password"
              placeholderTextColor='rgba(255,255,255, 0.9)'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              editable={this.state.inputEditable}
              returnKeyType={"go"}
              ref={ref => this.passwordRef = ref} 
              onSubmitEditing={this.onButtonPress.bind(this)}
             
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <CardSection>{this.renderButton()}</CardSection>

        </Card>

        

        <View>
        <CardSection>
          <TouchableOpacity
          onPress={this.showPasswordReset.bind(this)}
            style={{
              alignItems: "center",
              width: "100%",
              marginTop: 20
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {this.state.forgotPassword}
            </Text>
          </TouchableOpacity>
        </CardSection>
        </View>
        
    
        <CardSection>
          <TouchableOpacity
            disabled={true}
            style={{
              alignItems: "center",
              width: "100%",
             
            }}
          >
            <Text style={{ color: "white" }}>{this.state.haveAccount}</Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <TouchableOpacity
            onPress={this.showSignUp.bind(this)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {this.state.signUp}
            </Text>
          </TouchableOpacity>
        </CardSection>
        </View>

      // </ImageBackground>
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
    fontSize: 15,
    alignSelf: "center",
    color: "red"
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

