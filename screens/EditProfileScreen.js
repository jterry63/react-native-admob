import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  TextInput,
  Button,

} from "react-native";
import firebase from "firebase";

export default class EditProfileScreen extends React.Component {
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
        editName: null,
        editEmail: null,
        editURL: null,
        modalVisible: false,
        url: this.user.photoURL
    }
  }

  onSaveClick() {

    if (this.state.editEmail && this.state.editName && this.state.editURL) {
        var user = firebase.auth().currentUser;
        user
      .updateProfile({
        displayName: this.state.editName,
        email: this.state.editEmail,
        photoURL: this.state.editURL
      })
      .then(function() {
        console.log(user);
      })
      .catch(function(error) {
        console.log(error)
      });  
      
      Alert.alert(
        'Success!',
        'Your profile has been updated',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate("Profile")},
        ],
        {cancelable: false},
      );

        

    } else {
        this.setModalVisible(true);
    }

  }

  onCancelClick() {
    this.props.navigation.navigate("Profile")
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }



  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: this.state.url}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
                <View style={styles.containerStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(editName) => this.setState({editName})}
                    value={this.state.editName}
                    placeholder="Display Name"
                    placeholderTextColor="silver"
                />
                </View>
                <View style={styles.containerStyle}>
                <TextInput
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    onChangeText={(editEmail) => this.setState({editEmail})}
                    value={this.state.editEmail}
                    placeholder="Email Address"
                    placeholderTextColor="silver"
                />
              </View>
              <View style={styles.containerStyle}>
                <TextInput
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    onChangeText={(editURL) => this.setState({editURL})}
                    value={this.state.editURL}
                    placeholder="Profile Image URL"
                    placeholderTextColor="silver"
                />

              
              </View>
              
             
              
                    
              <TouchableOpacity
                onPress={() => {
                    this.onSaveClick();
                  }}
                style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Save</Text> 
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                    this.onCancelClick();
                  }}
                style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Cancel</Text> 
              </TouchableOpacity>

            </View>
        </View>

        <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalContainer}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.modalText}>All fields are required before profile can be updated.</Text>

              

              <TouchableHighlight
                style={styles.hideModal}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={styles.getStartedBtn}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{display: 'none'}}>Show Modal</Text>
        </TouchableHighlight>
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
    inputStyle: {
        color: '#474747',
        borderWidth: 2,
        
        borderColor: 'silver',
        paddingRight: 5,
        paddingLeft: 25,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 40,
        borderRadius: 25
      
    }, 
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: "white",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
      },
      modalText: {
        color: "#424242",
        marginTop: "25%",
        textAlign: "center",
        fontSize: 30,
        padding: 20
      },
      hideModal: {
        marginTop: 50
      },
      getStartedBtn: {
        color: "#424242",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: "underline",
        marginBottom: 50
      }
})
