import React from 'react';
import { Button, Card, CardSection, Input, Spinner } from '../components/common';
import firebase from 'firebase';
import { Text, ImageBackground, TouchableOpacity } from 'react-native';




export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = { 
    email: '', 
    password: '', 
    error: '', 
    loading: false, 
    loginBtn: 'Log In',
    forgotPassword: 'Forgot Password?', 
    haveAccount: "Don't have an account yet?",
    signUp: 'Sign Up',
    loggedIn: null
 };

 
 componentWillMount() {
    firebase.initializeApp({
        apiKey: "AIzaSyBFVFx_WPZzA2uQUP3zYcNp3Wtcn_HJROM",
        authDomain: "auth-523a5.firebaseapp.com",
        databaseURL: "https://auth-523a5.firebaseio.com",
        projectId: "auth-523a5",
        storageBucket: "auth-523a5.appspot.com",
        messagingSenderId: "142504376049"
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
          this.props.navigation.navigate('Home');
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }


onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this)) 
        });
}

onLoginFail() {
    this.setState({
        error: '',
        loading: false
    })
}

onLoginSuccess() {
    this.setState({ 
        email: '',
        password: '',
        loading: false,
        error: ''
    })
}

onSignUpClick() {
    this.setState({
        loginBtn: 'Sign Up',
        forgotPassword: '',
        haveAccount: '',
        signUp: ''
    })
}

renderButton() {
    if (this.state.loading) {
        return <Spinner size='small' />
    }

    return (<Button onPress={this.onButtonPress.bind(this)}>
                {this.state.loginBtn}
            </Button>
    );
}

render() {
    return (
        <ImageBackground source={{ uri: 'https://i.imgur.com/HH3twbC.png'}} style={{width: '100%', height: '100%'}}>
        <Card>
       
            <CardSection>
            <Text style={{ fontSize: 20, color: 'rgba(255,255,255, 0.6)', marginRight: 10, marginTop: 10}}></Text>
                
                <Input
                    autoCapitalize='none'
                    label="Email"
                    placeholder="Email"
                    value={this.state.email} 
                    onChangeText={email => this.setState({ email })}
                />
            </CardSection>

            <CardSection>
            <Text style={{ fontSize: 20, color: 'rgba(255,255,255, 0.6)', marginRight: 10, marginTop: 10}}></Text>
                <Input 
                    secureTextEntry
                    label="Password"
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
            </CardSection>
            
            <Text style={styles.errorTextStyle}>
           
                {this.state.error}
            </Text>
           
            <CardSection>
                {this.renderButton()}
            </CardSection>

        </Card>
        <CardSection>
            <TouchableOpacity style={{alignItems: "center", justifyContent: 'center', width: '100%'}}><Text style={{color: 'white', fontWeight: 'bold'}}>{this.state.forgotPassword}</Text></TouchableOpacity>
        </CardSection>

        <CardSection>
        <TouchableOpacity disabled={true} style={{alignItems: "center", justifyContent: 'center', width: '100%', marginTop: '25%'}}><Text style={{color: 'white'}}>{this.state.haveAccount}</Text></TouchableOpacity>
        </CardSection>

        <CardSection>
        <TouchableOpacity onPress={this.onSignUpClick.bind(this)} style={{ alignItems: "center", justifyContent: 'center', width: '100%', marginTop: '10%'}}><Text style={{color: 'white', fontWeight: 'bold'}}>{this.state.signUp}</Text></TouchableOpacity>

        </CardSection>
        </ImageBackground>
        
    );
}
}

const styles = {
errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'

}
}