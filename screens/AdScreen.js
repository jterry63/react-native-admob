import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo";
import firebase from 'firebase';



  _openRewarded = async () => {
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

export default class AdScreen extends React.Component {

  state = {
    counter: 0
  };

componentDidMount() {


    AdMobRewarded.setTestDeviceID("EMULATOR");
    // ALWAYS USE TEST ID for Admob ads
    AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/1712485313");
  
    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () =>
      console.log("Loaded")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
      console.log("Failed to load")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
      console.log("Opened")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidClose", () =>
      console.log("Closed")
    );
    AdMobRewarded.addEventListener("rewardedVideoWillLeaveApplication", () =>
      console.log("Left")
    );

    //user rewarded for watching video
    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () =>
    this.rewardUser()
  );
  
  }
  
  // componentWillUnmount() {
  //   AdMobRewarded.removeAllListeners();
  
  // }
  
  
  showRewarded() {
    // first - load ads and only then - show
    _openRewarded();
  }

  rewardUser () {
    this.setState({ counter: this.state.counter + 1})
    console.log("Rewarded");
    console.log("view count: " + this.state.counter)
    let user = firebase.auth().currentUser;
    let uid = user.uid;
    firebase
      .database()
      .ref("views/" + uid)
      .set({
        views: this.state.counter
      });
  }


  
  render() {
    return (
      <View style={styles.container}>
       
       
        <Button
          title="Click Here"
          onPress={this.showRewarded.bind(this)}
          containerViewStyle={styles.rewardedBanner}
        />
        <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rewardedBanner: {
    width: "100%",
    marginLeft: 0
  },
  interstitialBanner: {
    width: "100%",
    marginLeft: 0
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
