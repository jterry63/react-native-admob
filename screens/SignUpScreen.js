import React from "react";
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common";
import firebase from "firebase";
import { Text, ImageBackground, TouchableOpacity, View, StyleSheet } from "react-native";

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
    name: "",
    newUser: false,
    showPasswordReset: "none",
    emailAddress: ''
  };
  

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .then(this.updateProfile.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginFail() {
    this.setState({
      error: "",
      loading: false
    });
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
        displayName: this.state.name,
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
    return (
      <View style={styles.container}>
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
              <Input
                label="name"
                placeholder="Name"
                placeholderTextColor='rgba(255,255,255, 0.9)'
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
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

            <Input
              autoCapitalize="none"
              label="Email"
              placeholder="Email"
              placeholderTextColor='rgba(255,255,255, 0.9)'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
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
            <Input
              secureTextEntry
              label="Password"
              placeholder="Password"
              placeholderTextColor='rgba(255,255,255, 0.9)'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
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


        </Card>
    
      </View>
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

  }
});