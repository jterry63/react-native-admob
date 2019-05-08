import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.user = firebase.auth().currentUser

    this.state = {
        userName: this.user.displayName,
        emailAddress: this.user.email,
        memberSince: this.user.metadata.creationTime,
        lastLogin: this.user.metadata.lastSignInTime,
        url: this.user.photoURL
    }
  }

  onEditProfileClick() {
    this.props.navigation.navigate("EditProfile")
  }

  componentWillMount() {
    let user = firebase.auth().currentUser;
    this.setState({ 
        userName: user.displayName,
        emailAddress: user.email,
        url: user.photoURL

    })
  }

  logOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });

    this.props.navigation.navigate("Login")
  };


  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: this.state.url }}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.userName}</Text>
              <Text style={styles.info}>{this.state.emailAddress}</Text>
              <Text style={styles.description}>Member Since:{"\n"}{this.state.memberSince}{"\n"}Last Login:{"\n"}{this.state.lastLogin}{"\n"}</Text>
              
              <TouchableOpacity
               onPress={() => {
                this.onEditProfileClick();
              }}
              style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Edit Profile</Text>  
              </TouchableOpacity>              
              <TouchableOpacity 
                onPress={() => {
                    this.logOut();
                  }}
                style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Logout</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#23accd",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
   
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600",
    fontFamily: 'adlery',
    padding: 5
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#23accd",
  },
});
 

