import React from "react";
import { Image, Dimensions } from "react-native"
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";

export default class AdScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: true
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {height: screenHeight} = Dimensions.get('window');
    return (
 
      <Container>
     
      <Content padder style={{flex: 1, height: screenHeight, justifyContent: 'center'}}>
        <Card>
          <CardItem header bordered>
            <Text>How to get started with Charity Ads</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
             1. Do this
              </Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
             2. Now do this
              </Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
             3. And then do this 
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   modalContainer: {
//     backgroundColor: "#23accd",
//     height: "100%"
//   },

//   modalText: {
//     color: "white",
//     paddingTop: 10,
//     textAlign: "center",
//     fontSize: 30,
//     fontFamily: "adlery"
//   },

//   getStartedBtn: {
//     color: "#f5f5f5",
//     textAlign: "center",
//     marginTop: "25%",
//     fontWeight: "bold",
//     fontSize: 20,
//     textDecorationLine: "underline"
//   },
//   instructions: {
//     marginTop: "25%"
//   },


//   container: {
//     flex: 1,
//     backgroundColor: '#23accd',
//     justifyContent: "center"
//     },
//   errorTextStyle: {
//     fontSize: 20,
//     alignSelf: "center",
//     color: "white"
//   },
//   logo: {
//     fontFamily: 'adlery',
//     color: 'white',
//     fontSize: 80,
//     textAlign: 'center',
//     paddingTop: 10,

//   }


// });
