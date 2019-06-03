import React from "react";
import { Platform, Dimensions, StatusBar, View, StyleSheet } from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import Carousel from "react-native-carousel-view";
import firebase from "firebase";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export default class NewUserScreen extends React.Component {
  constructor() {
    super()

    this.user = firebase.auth().currentUser
    
  

  this.state = {
    modalVisible: true
  } 

}

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


  componentDidMount() {
    firebase
    .database()
    .ref("views/" + this.user.uid)
    .set({
      views: 0,
    });
    
    firebase
    .database()
    .ref("tickets/" + this.user.uid)
    .set({
      ticketViewCountdown: 3
    });

    firebase
    .database()
    .ref("entries/" + this.user.uid)
    .set({
      ticketEntries: 0
    });

    this.addPhotoURL();
    

  }
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content>
          <Carousel
            width={deviceWidth}
            height={deviceHeight}
            loop={false}
            indicatorAtBottom
            indicatorOffset={deviceHeight / 15}
            indicatorSize={Platform.OS === "android" ? 15 : 10}
            indicatorColor="#FFF"
            delay={4000}
          >
            <View style={styles.slides}>
              <Text
                style={
                  Platform.OS === "android"
                    ? styles.apaginationText
                    : styles.iospaginationText
                }
              >
                1 of 3
              </Text>
              <Text style={{ color: "white", fontFamily: "adlery", fontSize: 60, padding: 5 }}>Welcome to{"\n"}Charity Ads!</Text>
              <Text
                numberOfLines={2}
                style={
                  Platform.OS === "android" ? styles.aText : styles.iosText
                }
              >
                We're glad you're here.{"\n"}Swipe for some helpful tips to get started. 
              </Text>
              <Button
                transparent
                rounded
                onPress={() => this.props.navigation.navigate("Home")}
                style={styles.Button}
              >
                <Text style={{ color: "#FFF", fontWeight: "600" }}>
                  Skip To App
                </Text>
              </Button>
            </View>

            <View style={styles.slides}>
              <Text
                style={
                  Platform.OS === "android"
                    ? styles.apaginationText
                    : styles.iospaginationText
                }
              >
                2 of 3
              </Text>
             
              <Icon
                name="ios-play"
                style={styles.imageIcons}
              />
             
              <Text
                numberOfLines={6}
                style={
                  Platform.OS === "android" ? styles.aText : styles.iosText
                }
              >
                From the play tab, click 'Watch Ad' and view the ad all the way through. Repeat as many times as you'd like.
              </Text>
              
              <Button
                transparent
                rounded
                onPress={() => this.props.navigation.navigate("Home")}
                style={styles.Button}
              >
                <Text style={{ color: "#FFF", fontWeight: "600" }}>
                  Skip To App
                </Text>
              </Button>
            </View>

            <View style={styles.slides}>
              <Text
                style={
                  Platform.OS === "android"
                    ? styles.apaginationText
                    : styles.iospaginationText
                }
              >
                3 of 3
              </Text>
              <Icon name="ios-home" style={styles.imageIcons} />
              <Text
                numberOfLines={5}
                style={
                  Platform.OS === "android" ? styles.aText : styles.iosText
                }
              >
                From the home page you will see your updated number of total views, as well as the number of entries that you have for the next prize drawing.
              </Text>
              <Button
                transparent
                rounded
                onPress={() => this.props.navigation.navigate("Home")}
                style={styles.Button}
              >
                <Text style={{ color: "#FFF", fontWeight: "600" }}>
                  Continue To App
                </Text>
              </Button>
            </View>
          </Carousel>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  slides: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#23accd",
    height: deviceHeight,
    width: deviceWidth
  },
  iosText: {
    fontSize: 16,
    padding: 60,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 0,
    color: "#FFF"
  },
  aText: {
    fontSize: 16,
    padding: 40,
    textAlign: "center",
    fontWeight: "bold",
    margin: 40,
    color: "#FFF"
  },
  iospaginationText: {
    position: "relative",
    top: -(deviceHeight / 7),
    fontSize: 20,
    lineHeight: 0,
    fontWeight: "bold",
    color: "#FFF"
  },
  apaginationText: {
    top: -(deviceHeight / 9),
    fontSize: 20,

    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    color: "#FFF"
  },
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 50,
    height: 1,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 20
  },
  swiperActiveDot: {
    backgroundColor: "#fff",
    width: 50,
    height: 1,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 20
  },
  imageIcons: {
    fontSize: 120,
    color: "white"
  },
  Button: {
    alignSelf: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});


