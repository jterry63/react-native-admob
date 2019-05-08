import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight
} from "react-native";

export default class AdScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: true
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
 

      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={{marginTop: 30}}>
            <Text style={styles.modalText}>Welcome to Charity Ads!</Text>
            <View style={styles.instructions}>
              <Text style={{ fontSize: 30, color: "white" }}>1. do this</Text>
              <Text style={{ fontSize: 30, color: "white" }}>
                2. then do this
              </Text>
              <Text style={{ fontSize: 30, color: "white" }}>
                3. now do this
              </Text>
            </View>

           
          </View>
        </View>

        <TouchableHighlight
        style={{display: 'none'}}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#23accd",
    height: "100%"
  },

  modalText: {
    color: "white",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "adlery"
  },

  getStartedBtn: {
    color: "#f5f5f5",
    textAlign: "center",
    marginTop: "25%",
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline"
  },
  instructions: {
    marginTop: "25%"
  },


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
