import React from "react";
import { Button, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { AdMobBanner, AdMobInterstitial, AdMobRewarded} from "expo";
import { EvilIcons } from '@expo/vector-icons';
import firebase from 'firebase';



  _openRewarded = async () => {
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

export default class AdScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.user = firebase.auth().currentUser
    this.database = firebase.database().ref("/views/" + this.user.uid).child("views")

  this.state = {
    counter: 0,
    loading: false
  };
}

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#23accd" />;
    
    }

    return (
      <TouchableOpacity
      onPress={this.showRewarded.bind(this)}
      style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:100,
       height:100,
       backgroundColor:'#fff',
       borderRadius:50,
       shadowColor: 'silver',
       shadowOffset: { height: 2, width: 2 },
       shadowOpacity: 1,
       shadowRadius: 1.5
     }}
    >
      <Text style={{textAlign: 'center', color: '#929394'}}><EvilIcons name="play" size={45} color="#929394" />{"\n"}Watch Ad</Text>
    </TouchableOpacity>
    );
  }

  openedVideo() {
    console.log("Opened");
    this.setState({ loading: false})
  }

componentDidMount() {

  this.database.on('value', snap => {
    this.setState({ counter: snap.val()})
  })


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
      this.openedVideo()
      
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
    this.setState({ loading: true})
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
        {this.renderButton()}
        {/* <AdMobBanner
          style={styles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        /> */}


    {/* <TouchableOpacity
      onPress={this.showRewarded.bind(this)}
      style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:100,
       height:100,
       backgroundColor:'#fff',
       borderRadius:50,
     }}
    >
      <Text style={{textAlign: 'center', color: '#929394'}}><EvilIcons name="play" size={45} color="#929394" />{"\n"}Watch Ad</Text>
    </TouchableOpacity> */}
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
