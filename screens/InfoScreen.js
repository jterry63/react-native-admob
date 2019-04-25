import React from 'react';
import { View, Text, StyleSheet, Modal, Alert, TouchableHighlight } from 'react-native';


export default class AdScreen extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  


  render() {
    return (
        // <View style={styles.container}>
        //     <Text style={styles.text}>
        //         This is where our amazing explanation will go.
        //     </Text>
  
        // </View>


        <View>
        
     
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.modalText}>Welcome to Charity Ads!</Text>
              <View style={styles.instructions}>

              <Text style={{fontSize: 30, color: 'white'}}>1.  do this</Text>
              <Text style={{fontSize: 30, color: 'white'}}>2.  then do this</Text>
              <Text style={{fontSize: 30, color: 'white'}}>3.  now do this</Text>
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
        

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#23accd',
        height: '100%'
      },

    modalText:{
        color: 'white',
        marginTop: '25%',
        textAlign: 'center',
        fontSize: 75,
        fontFamily: 'adlery'
      
       
    },
    hideModal: {
        marginTop: 50,
    },
    getStartedBtn: {
        color: '#f5f5f5',
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