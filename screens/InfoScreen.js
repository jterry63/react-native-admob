import React from "react";

import { Container, Content, Text, Icon, View, Header } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { StyleSheet, View as RNView, Dimensions, Image } from "react-native";
import Carousel from "react-native-carousel-view";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;




export default class AdScreen extends React.Component {

  static navigationOptions = {
    header: null
  };


  render() {
    
    return (
      <Container style={styles.bg}>

        <Header style={{backgroundColor: 'white'}}>
           <Text style={styles.header}>
            Charity Ads
          </Text>
        </Header>

        <View style={styles.overviewHeaderContainer}>
          <Text style={styles.overviewHeader}>How to get started?</Text>
          <Text note style={styles.overviewHead}>
            It's easy! Follow the steps below
          </Text>
        </View>

        <Content showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text />
              </View>
            </View>

            <View style={styles.contentContainer}>
              <Grid>
                <Col style={{ flexDirection: "row" }}>
                  <Icon
                    name="ios-play"
                    style={{ color: "#999", marginLeft: 3, fontSize: 35 }}
                  />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={styles.timelineContentHeading}>
                      1. Watch an ad all the way through 
                    </Text>
                  </View>
                </Col>
               
              </Grid>
            </View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTextHeader}>
                  From the play tab, click 'Watch Ad' and view the ad all the way through. Repeat as many times as you'd like. 
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Grid>
                <Col style={{ flexDirection: "row" }}>
                  <Icon
                    name="ios-home"
                    style={{color: "#999", fontSize: 30}}
                  />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.timelineContentHeading}>
                      2. Check the home page 
                      </Text>
                  </View>
                </Col>
              
              </Grid>
            </View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTextHeader}>
                  From the home page you will see your updated number of total views, as well as the number of entries that you have for the next drawing.
                </Text>
                <Text numberOfLines={2} style={styles.timelineTextComment}>
                  'Views remaining for next ticket entry' and 'Current number of entries' will reset after every prize drawing.
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.timelineView}>
              <View style={styles.timelineContent}>
                <Text />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Grid>
                <Col style={{ flexDirection: "row" }}>
                <Icon
                    name="ios-refresh"
                    style={{ color: "#999", fontSize: 35 }}
                  />
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.timelineContentHeading}>3. Repeat</Text>
                  </View>
                </Col>
   
              </Grid>
            </View>
            <View style={{ paddingLeft: 30, backgroundColor: "#fff",  borderBottomColor: '#d4d4d2', borderBottomWidth: 1}}>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTextHeader}>
                  There is no limit to how many ads you can watch to help those in need. 
                </Text>
                <Text numberOfLines={2} style={styles.timelineTextComment}>
                As an added bonus, you get ticket entries to our frequent prize drawings.
                </Text>
                <Text style={{ color: "#23accd", fontSize: 25, marginTop: 20, fontFamily: "adlery", padding: 5}}>
                Thank you for your contribution
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.wrapper}>
            
                <Carousel
                  width={deviceWidth}
                  height={230}
                  indicatorAtBottom
                  indicatorSize={Platform.OS === "android" ? 15 : 10}
                  indicatorColor="white"
                  indicatorOffset={10}
                  delay={2500}
                  
                >
                  
                  <RNView style={styles.slide}>
                  
                    <Image
                      style={styles.newsPoster}
                      source={require("../assets/images/IMG_2315.jpg")}
                    />
                  </RNView>
                  <RNView style={styles.slide}>
                    <Image
                      style={styles.newsPoster}
                      source={require("../assets/images/IMG_2316.jpg")}
                    />
                  </RNView>
                  <RNView style={styles.slide}>
                    <Image
                      style={styles.newsPoster}
                      source={require("../assets/images/IMG_2317.jpg")}
                    />
                  </RNView>
               
                </Carousel>
              </View>

          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  overviewHeaderContainer: {
    padding: 20,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#23accd"
  },
  overviewHeader: {
    fontSize: 22,
    paddingBottom: 10,
    fontWeight: "900",
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF"
  },
  overviewHead: {
    opacity: 0.8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF"
  },
  timelineView: {
    paddingLeft: 30,
    backgroundColor: "#fff"
  },
  timelineContent: {
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 15
  },
  contentContainer: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20
  },
  timelineIcon: {
    alignSelf: "center",
    color: "#999"
  },
  timelineContentHeading: {
    color: "#23accd",
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 8
  },
  newsTypeView: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginTop: 8
  },
  timeIcon: {
    fontSize: 20,
    paddingRight: 10,
    color: "#666",
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    marginTop: Platform.OS === "android" ? -2 : -3
  },
  time: {
    color: "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  timelineTextHeader: {
    color: "#222",
    fontSize: 14,
    fontWeight: "700",
    paddingTop: Platform.OS === "android" ? 5 : 0
  },
  timelineTextComment: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5
  },
  header: {
    backgroundColor: "white", 
    fontFamily: 'adlery',
    padding: 5,
    fontSize: 25,
    textAlign: "center",
    marginTop: 5
   
  },
  bg: {
    backgroundColor: "#FFF"
  },
  newsContent: {
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  newsHeader: {
    color: "#222",
    fontWeight: "500",
    fontSize: 14
  },
  newsCommentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    borderLeftWidth: 2,
    borderLeftColor: "#222"
  },
  newsComment: {
    color: "#222",
    fontWeight: "500",
    fontSize: 14
  },
  newsLink: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: Platform.OS === "android" ? "#777" : "#666",
    alignSelf: "flex-end"
  },
  newsTypeText: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 2
  },
  newsPoster: {
    width: null,
    flex: 1,
    height: deviceHeight / 2.4
  },
  newsPosterHeader: {
    fontWeight: "900"
  },
  newsPosterContent: {
    marginTop: deviceHeight / 3,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  timeIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? -1 : -3,
    color: "#666"
  },
  nightButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignSelf: "center"
  },
  dayButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignSelf: "center"
  },
  modal: {
    backgroundColor: "#222",
    position: "absolute",
    width: deviceWidth,
    height: null,
    top: Platform.OS === "android" ? 55 : 60,
    paddingBottom: Platform.OS === "android" ? 20 : 10
  },
  slide: {
    flex: 1,
    width: deviceWidth,
    height: 230,
    backgroundColor: "transparent"
  },
  wrapper: {
    flex: 1
  },
  headerStyle: {
    paddingLeft: 0,
    paddingRight: 0
  },
  headerModalStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    elevation: 0
  },
  headerIcons: {
    fontSize: 30,
    backgroundColor: "transparent"
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -5,
    marginLeft: Platform.OS === "android" ? -5 : undefined
  },
  headerBtns: {
    padding: 10
  },
  headerTextIcon: {
    fontSize: 28,
    paddingTop: 10,
    marginTop: Platform.OS === "android" ? -10 : 0
  },
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.8)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  swiperActiveDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  modalContentBox: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.5)"
  },
  modalContentGrid1: {
    padding: 20,
    paddingBottom: 15,
    justifyContent: "center"
  },
  modalContentGridText: {
    fontSize: 12,
    marginTop: 8,
    alignSelf: "center"
  },
  modalContentGrid2: {
    flexDirection: "row",
    paddingTop: 20,
    marginHorizontal: 10
  },
  modalSmallText: {
    alignSelf: "flex-start",
    fontWeight: "700"
  },
  modalLargeText: {
    alignSelf: "flex-end",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 28
  },
  nextStoryBtn: {
    color: "#222",
    fontWeight: "900"
  },
  forwardBtn: {
    color: "#222",
    fontSize: 26
  }


});
