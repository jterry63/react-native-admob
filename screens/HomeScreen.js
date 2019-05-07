import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableHighlight
} from "react-native";
import { Spinner } from "../components/common"
import firebase from "firebase";


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "charity ads",
    headerTitleStyle: {
      fontFamily: "adlery",
      fontSize: 25
    },
    headerStyle: {
      backgroundColor: "whitesmoke"
    }
  };

  constructor() {
    super()
    this.user = firebase.auth().currentUser
    this.database = firebase.database().ref("/views/" + this.user.uid).child("views")

  this.state = {
    loading: false,
    modalVisible: false,
    userName: "",
    userEmail: "",
    viewCount: 0,
  }
}

  componentDidMount() {
    this.database.on('value', snap => {
      this.setState({ viewCount: snap.val()})
      console.log("views: " + this.state.viewCount)
    })

    this.setState({ 
      userName: this.user.displayName,
      userEmail: this.user.email
    })

  }




  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <View>
        <Text style={styles.textColor}>Views:</Text>
        <Text style={styles.views}>{this.state.viewCount}</Text>
        </View>
    );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
        <View style={styles.firstrow}>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Image
              source={{ uri: "https://i.imgur.com/WMy7Wid.png" }}
              style={{ width: 115, height: 115, borderRadius: 55 }}
            />
          </TouchableHighlight>
          <Text style={{ marginTop: 10, fontSize: 15 }}>
            {this.state.userName}
          </Text>
        </View>


        <View style={styles.secondrow}>
          {this.renderButton()}
        </View>

        <View style={styles.fourthrow} />

        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: "https://i.imgur.com/WMy7Wid.png" }}
                  />

                  <Text style={styles.name}>{this.state.userName}</Text>
                  <Text style={styles.userInfo}>{this.state.userEmail}</Text>
                </View>
              </View>

              <View style={styles.body}>
                <View style={styles.item}>
                  <Text style={styles.info}>Settings</Text>
                </View>

                <TouchableHighlight
                  onPress={() => {
                    this.logOut();
                  }}
                >
                  <View style={styles.item}>
                    <Text style={styles.info}>Sign Out</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.bottom}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <View>
                    <Text style={styles.info}>Close</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight>
            <Text style={{ display: "none" }}>Show Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  firstrow: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  secondrow: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,128,128,.3)",
    marginTop: 20,
    width: "80%",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#119da4",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  thirdrow: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,128,128,.3)",
    marginTop: 20,
    width: "80%",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#119da4",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },

  fourthrow: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20
  },
  textColor: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  views: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  },
  modalContainer: {
    backgroundColor: "whitesmoke",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  modalText: {
    color: "#424242",
    marginTop: "25%",
    textAlign: "center",
    fontSize: 75,
    fontFamily: "adlery"
  },
  hideModal: {
    marginTop: 50
  },
  getStartedBtn: {
    color: "#424242",
    textAlign: "center",
    marginTop: "25%",
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline"
  },
  instructions: {
    marginTop: "25%"
  },
  header: {
    backgroundColor: "white"
  },
  headerContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
    marginTop: 5
  },
  body: {
    backgroundColor: "white",
    height: 500,
    alignItems: "center"
  },
  item: {
    flexDirection: "row"
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 20
  },
  info: {
    fontSize: 18,
    marginTop: 17,
    color: "black"
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10
  }
});





