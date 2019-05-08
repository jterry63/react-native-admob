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
    header: null
  };

  constructor() {
    super()
    this.user = firebase.auth().currentUser
    this.database = firebase.database().ref("/views/" + this.user.uid).child("views")

  this.state = {
    loading: false,
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
       
        </View>


        <View style={styles.secondrow}>
          {this.renderButton()}
        </View>

        <View style={styles.fourthrow} />

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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start"
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
    backgroundColor: "white",
    marginTop: 30
  },
  headerContent: {
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
    alignItems: "center",
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
    justifyContent: "center",
 
  }
});





