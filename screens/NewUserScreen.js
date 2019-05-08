import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableHighlight
} from "react-native";
import firebase from "firebase";
import TutorialCarousel from "../components/common/TutorialCarousel";

export default class NewUserScreen extends React.Component {
  state = {
    modalVisible: true
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //the photo URL is the key to new vs existing user. When this photoURL is set, they will no longer be recognized as a new user and the new user modal will not be displayed. 
  addPhotoURL() {
    var user = firebase.auth().currentUser;
    user
      .updateProfile({
        photoURL: "https://i.imgur.com/WMy7Wid.png",
      })
      .then(function() {
        console.log(user);
      })
  }

  render() {
    return (
      <View style={styles.container}>
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
              <Text style={styles.modalText}>Welcome to{"\n"}Charity Ads!</Text>

              <TutorialCarousel />

              <TouchableHighlight
                style={styles.hideModal}
                onPress={() => {
                  this.addPhotoURL();
                  this.setModalVisible(!this.state.modalVisible);
                  this.props.navigation.navigate("Home");
                  
                }}
              >
                <Text style={styles.getStartedBtn}>Get Started!</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight>
          <Text style={{ display: "none" }}>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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
    fontSize: 50,
    fontFamily: "adlery",
    paddingTop: 10
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
});


