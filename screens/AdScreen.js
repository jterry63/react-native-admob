import React from "react";
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { AdMobBanner, AdMobInterstitial, AdMobRewarded} from "expo";
import { EvilIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';



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
    this.viewDatabase = firebase.database().ref("/views/" + this.user.uid).child("views")
    this.globalDatabase = firebase.database().ref("/views/globalViews").child("views")

  this.state = {
    counter: 0,
    globalViews: 0,
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

  this.viewDatabase.on('value', snap => {
    this.setState({ counter: snap.val()})
  })

  this.globalDatabase.on('value', snap => {
    this.setState({ globalViews: snap.val()})
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
    this.setState({ counter: this.state.counter + 1, globalViews: this.state.globalViews + 1})
    console.log("Rewarded");
    console.log("view count: " + this.state.counter)

    firebase
      .database()
      .ref("views/" + this.user.uid)
      .set({
        views: this.state.counter
      });

      firebase
      .database()
      .ref("views/globalViews")
      .set({
        views: this.state.globalViews
      });
   
      
  }


  
  render() {
    return (
      // <View style={styles.container}>
      //   {this.renderButton()}

      // </View>

      <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <View style={styles.container}>
      {this.renderButton()}
      </View>
    </Container>
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
