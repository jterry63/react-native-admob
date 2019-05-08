import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class TutorialCarousel extends Component {
  state = {
    color: ""
  };

  render() {
    let screenWidth = Dimensions.get("window").width;

    return (
      <ScrollView
        onScroll={event => {
          this.xOffset = event.nativeEvent.contentOffset.x;
          console.log(xOffset);
        }}
        horizontal={true}
        pagingEnabled
        style={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={this.handleScroll}
      >
      
        <View style={{ width: screenWidth }}>
          <ImageBackground
            source={{
              uri:
                "https://thepowerhouseinc.com/wp-content/uploads/2017/07/WaterBackground2.jpg"
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Text style={styles.welcome}>
              <Text style={{ fontSize: 25 }}>
                How to use Charity Ads {"\n"}
                {"\n"}
                {"\n"}
              </Text>
              <Text style={{ textAlign: "center" }}>
                Click the "Watch Ads" tab.{"\n"}
                {"\n"}
              </Text>
              <Text style={{ textAlign: "center" }}>
                Watch the complete ad.{"\n"}
                {"\n"}
              </Text>
              <Text style={{ textAlign: "center" }}>
                Money will be automatically donated to charity.{"\n"}
                {"\n"}
              </Text>
              <Text style={{ textAlign: "center" }}>
                Every ad you watch will qualify you for weekly drawings and
                prizes.{"\n"}
              </Text>
            </Text>
          </ImageBackground>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#d4d4d2" />
            </View>
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#78aef1" />
            </View>
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#78aef1" />
            </View>
          </View>
        </View>

        <View style={{ width: screenWidth }}>
          <ImageBackground
            source={{
              uri:
                "https://thepowerhouseinc.com/wp-content/uploads/2017/07/WaterBackground2.jpg"
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Text style={{ paddingTop: "40%", textAlign: "center" }}>
             
              What can one ad view accomplish? Each ad view will provide clean
              water to one person for one day. Every 20 ads watched will provide...
              {/* one nutritious meal to an American in need. */}
            </Text>
          </ImageBackground>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#78aef1" />
            </View>
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#d4d4d2" />
            </View>
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#78aef1" />
            </View>
          </View>
        </View>

        <View style={{ width: screenWidth }}>
          <ImageBackground
            source={{
              uri:
                "https://thepowerhouseinc.com/wp-content/uploads/2017/07/WaterBackground2.jpg"
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Text style={{ paddingTop: "40%", textAlign: "center" }}>
              {" "}
              What is Charity Ads? Over 40 million Americans struggle with
              hunger and food insecurity. 10% of the world's population lack...
              {/* access to clean, safe water. Charity Ads is aimed at providing
              food to hungry Americans and clean water throughout the world. A
              portion of the revenue generated from watching ads in this app is
              donated to charities that combat food and water insufficiencies
              throughout the world. */}
            </Text>
          </ImageBackground>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#78aef1" />
            </View>
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#78aef1" />
            </View>
            <View style={{ marginRight: 5 }}>
              <Ionicons name="ios-water" size={20} color="#d4d4d2" />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    height: 400,
    paddingVertical: 40,

    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
  welcome: {
    flex: 1,
    margin: 10,
    // backgroundColor: '#d5f2f9',
    margin: 10,
    textAlign: "center",
    fontSize: 15,
    paddingTop: 2
  }
});
