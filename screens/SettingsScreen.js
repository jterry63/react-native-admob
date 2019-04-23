import React from 'react';
import { View, Button } from 'react-native';
import firebase from 'firebase';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Account Settings',
  };

  logOut = () => {
    firebase.auth().signOut();
  }


  render() {
    return (
    <View>
      <Button title='logout' onPress={() => this.logOut()} />
    </View>
    

    )
    
    
    
    ;
  }
}
