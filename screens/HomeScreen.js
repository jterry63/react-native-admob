import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Modal,
  Alert,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { Spinner } from "../components/common"
import firebase from "firebase";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Accordion, Item } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.user = firebase.auth().currentUser
    this.database = firebase.database().ref("/views/" + this.user.uid).child("views")
    this.globalDB = firebase.database().ref("/views/globalViews").child("views")
    this.ticketCountdownDatabase = firebase.database().ref("tickets/" + this.user.uid).child("ticketViewCountdown")
    this.ticketEntriesDatabase = firebase.database().ref("entries/" + this.user.uid).child("ticketEntries")
    this.drawingTimeDatabase = firebase.database().ref("drawing_time").child("date")

  this.state = {
    loading: false,
    userName: "",
    userEmail: "",
    viewCount: 0,
    globalViewCount: 0,
    ticketViewCountdown: 3,
    ticketEntries: 0,
    drawingTime: ""
  }
}

  componentDidMount() {


    this.database.on('value', snap => {
      this.setState({ viewCount: snap.val()})
      console.log("(home page) views: " + this.state.viewCount)
    })

    this.globalDB.on('value', snap => {
      this.setState({ globalViewCount: snap.val()})
      console.log("(home page) global views: " + this.state.globalViewCount)
    })

    this.ticketCountdownDatabase.on('value', snap => {
      this.setState({ ticketViewCountdown: snap.val()})
    })

    this.ticketEntriesDatabase.on('value', snap => {
      this.setState({ ticketEntries: snap.val()})
    })

    this.drawingTimeDatabase.on('value', snap => {
      this.setState({ drawingTime: snap.val()})
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

        <View>
        <Text style={styles.textColor}>Global Views:</Text>
        <Text style={styles.views}>{this.state.globalViewCount}</Text>
        
        </View>

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
    const {height: screenHeight} = Dimensions.get('window');
    const dataArray = [
      { title: "What are the positive impacts of these views?", content: "The " + this.state.globalViewCount + " views that CharityAds users have watched are helping to combat food and water insufficiencies throughout the world. We have been able to build water wells for those without clean, safe water and provide meals to the hungry" },
    ];
    const dataArray2 = [
      { title: "Why are your views important?", content: "Every ad view is valuable to those in need. For example, one simple ad view can provide 8 days of clean water to an individual. 10 ad views is enough to provide a meal to someone without food. You are able to have a significant impact by giving of your time to watch ads." }
    ];

    return (
 <Container>
         <Header style={{backgroundColor: 'white'}}>
           
           <Text style={styles.header}>
      Charity Ads
      </Text>
          
         </Header>

      <ScrollView>
        <Content style={{flex: 1, height: screenHeight, justifyContent: 'flex-start'}}>

    




          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://www.seekpng.com/png/small/31-310445_globe-clipart-png-public-domain-globe-clipart.png'}} />
                <Body>
                  <Text>Total Ads Watched for Charity:</Text>
               
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{textAlign: "center", marginBottom: 15, fontSize: 20, fontWeight: "bold"}}>
              {this.state.globalViewCount}
              </Text>
        
            </CardItem>
            <Accordion headerStyle={{ backgroundColor: "whitesmoke" }} contentStyle={{ backgroundColor: "white" }} dataArray={dataArray} expanded={1}/>
       
      
          </Card>




          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.user.photoURL}} />
                <Body>
                  <Text>Your Total Ads Watched for Charity:</Text>
               
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{textAlign: "center", marginBottom: 15, fontSize: 20, fontWeight: "bold"}}>
              {this.state.viewCount}
              </Text>
            </CardItem>

            <Accordion headerStyle={{ backgroundColor: "whitesmoke" }} contentStyle={{ backgroundColor: "white" }} dataArray={dataArray2} expanded={1}/>
      
          </Card>

          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: "http://static1.squarespace.com/static/5bf71e47372b9640778bbc5e/5c58a0e5085229157dfe8508/5c592285e79c70b18f395e71/1551739385999/tickets-transparent.png"}} />
                <Body>
                  <Text>Views Remaining For Next Ticket Entry:</Text>
               
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{textAlign: "center", marginBottom: 15, fontSize: 20, fontWeight: "bold"}}>
              {this.state.ticketViewCountdown}
              </Text>
            </CardItem>

            <CardItem cardBody style={{justifyContent: "center", alignItems: "center", marginBottom: 5}}>
            <Text style={{textAlign: "center"}}>
              Current number of entries for this drawing: {this.state.ticketEntries}
            </Text>
         
            </CardItem>

            <CardItem footer bordered cardBody style={{justifyContent: "center", alignItems: "center"}}>
            <Text style={{textAlign: "center"}}>
              Our next ticket drawing will occur on:{"\n"}{this.state.drawingTime}{"\n"}
            </Text>
         
            </CardItem>
      
          </Card>



        </Content>

        </ScrollView>


      </Container>
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
    marginTop: 30,
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
    fontFamily: 'adlery',
    padding: 5,
    fontSize: 25,
    textAlign: "center",
    marginTop: 5
   
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





