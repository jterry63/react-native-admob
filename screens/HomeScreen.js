import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  Modal,
  Alert,
  TouchableHighlight
} from 'react-native';
import firebase from 'firebase';
import { CardSection, Card } from '../components/common';





export default class HomeScreen extends React.Component {

  state = {
    modalVisible: true,
  };

  static navigationOptions = {
    title: 'charity ads',
    headerTitleStyle: {
      fontFamily: "adlery", 
      fontSize: 25,
    },
    headerStyle: {
      backgroundColor: 'whitesmoke'
    }
  
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  logOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (

     
   
      <View style={styles.container}>

      <View style={styles.firstrow}>
       
          <Image  source={{uri: 'https://i.imgur.com/Hb9YNoP.jpg'}}
          style={{width: 115, height: 115, borderRadius: 55}} />
       
      </View>

      <View style={styles.secondrow}>
        <Text style={styles.textColor}>
          $ Earned Today: 
        </Text>
      </View>

      <View style={styles.thirdrow}>
        <Text style={styles.textColor}>
          $ Earned All Time: 
        </Text>
      </View>

      <View style={styles.fourthrow}></View>






      <View style={{marginTop: 22}}>
        <Modal 
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.modalText}>Welcome to Charity Ads!</Text>
              <View style={styles.instructions}>

              <Text style={{fontSize: 30, color: '#23accd'}}>1.  do this</Text>
              <Text style={{fontSize: 30, color: '#23accd'}}>2.  then do this</Text>
              <Text style={{fontSize: 30, color: '#23accd'}}>3.  now do this</Text>
              </View>

              <TouchableHighlight
              style={styles.hideModal}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.getStartedBtn}>Get Started!</Text>
              </TouchableHighlight>
            </View>
      
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{display: 'none'}}>Show Modal</Text>
        </TouchableHighlight>
      </View>
      <View>
      <Button title='logout' onPress={() => this.logOut()} />
    </View>
      </View>

      

    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  firstrow: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  secondrow: {
    flex: 1,
    backgroundColor: "rgba(0,128,128,.3)",
    marginTop: 20,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#119da4',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },

  thirdrow: {
    flex: 1,
    backgroundColor: "rgba(0,128,128,.3)",
    marginTop: 20,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#119da4',
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  modalContainer: {
    backgroundColor: 'whitesmoke',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

modalText:{
    color: '#424242',
    marginTop: '25%',
    textAlign: 'center',
    fontSize: 75,
    fontFamily: 'adlery'
  
   
},
hideModal: {
    marginTop: 50,
},
getStartedBtn: {
    color: '#424242',
    textAlign: 'center',
    marginTop: '25%',
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline'
 
    
},
instructions: {
    marginTop: '25%'
}
  
});





