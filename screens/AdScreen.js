import React from "react";
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { AdMobBanner, AdMobInterstitial, AdMobRewarded} from "expo";
import { EvilIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import { Container, Header, Text } from 'native-base';



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
    this.ticketCountdownDatabase = firebase.database().ref("tickets/" + this.user.uid).child("ticketViewCountdown")
    this.ticketEntriesDatabase2 = firebase.database().ref("entries/" + this.user.uid).child("ticketEntries")

  this.state = {
    counter: 0,
    globalViews: 0,
    ticketViewCountdown: 3,
    numTicketEntries: 0,
    loading: false,
    hasTickets: false
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

  this.ticketCountdownDatabase.on('value', snap => {
    this.setState({ ticketViewCountdown: snap.val()})
    if (snap.val() === 0) {
      this.ticketController();
    }
  })

  this.ticketEntriesDatabase2.on('value', snap => {
    this.setState({ numTicketEntries: snap.val()})
    console.log("number of ticket entries: " + snap.val())
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
      .ref("tickets/" + this.user.uid)
      .set({
        ticketViewCountdown: this.state.ticketViewCountdown - 1
      });


      firebase
      .database()
      .ref("views/globalViews")
      .set({
        views: this.state.globalViews
      });
  }

  ticketController() {
  
    switch (this.state.numTicketEntries) {
      case 0:

        firebase
        .database()
        .ref("entries/" + this.user.uid)
        .set({
          ticketEntries: 1
        });
    
        firebase
        .database()
        .ref("tickets/" + this.user.uid)
        .set({
          ticketViewCountdown: 5
        });

        break;

      case 1:
    
        firebase
        .database()
        .ref("entries/" + this.user.uid)
        .set({
          ticketEntries: 2
        });
    
        firebase
        .database()
        .ref("tickets/" + this.user.uid)
        .set({
          ticketViewCountdown: 10
        });

        break;

        case 2:
    
          firebase
          .database()
          .ref("entries/" + this.user.uid)
          .set({
            ticketEntries: 3
          });
      
          firebase
          .database()
          .ref("tickets/" + this.user.uid)
          .set({
            ticketViewCountdown: 15
          });

          break;

          case 3:
    
            firebase
            .database()
            .ref("entries/" + this.user.uid)
            .set({
              ticketEntries: 4
            });
        
            firebase
            .database()
            .ref("tickets/" + this.user.uid)
            .set({
              ticketViewCountdown: 20
            });

            break;

      default:
        firebase
        .database()
        .ref("entries/" + this.user.uid)
        .set({
          ticketEntries: this.state.numTicketEntries + 1
        });
    
        firebase
        .database()
        .ref("tickets/" + this.user.uid)
        .set({
          ticketViewCountdown: 20
        });
    }
    
  }
  
  render() {
    return (
      // <View style={styles.container}>
      //   {this.renderButton()}

      // </View>

      <Container>
      {/* <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header> */}
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
