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
  ImageBackground
} from 'react-native';
import { CardSection, Card } from '../components/common';





export default class HomeScreen extends React.Component {

  state = {
    modalVisible: false,
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



  render() {
    return (

     
   
      <View style={styles.container}>
      <View style={styles.firstrow}></View>
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
      </View>

    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },

  firstrow: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20
  },

  secondrow: {
    flex: 1,
    backgroundColor: "rgba(0,128,128,.3)",
    marginTop: 20,
   
    borderRadius: 5,
    padding: 10,
    shadowColor: '#119da4',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },

  thirdrow: {
    flex: 1,
    backgroundColor: "rgba(0,128,128,.3)",
    marginTop: 20,
   
    borderRadius: 5,
    padding: 10,
    shadowColor: '#119da4',
    shadowOffset: {
      width: 0,
      height: 5
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
    fontSize: 30,
    textAlign: 'center'
  }
  
});





