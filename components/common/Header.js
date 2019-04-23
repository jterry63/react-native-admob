//import libraries for making a component

import React from 'react';
import { Text, View, Image } from 'react-native';

//make a component

const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
          <Image
          style={{width: 145, height: 41, marginTop: 40}}
          source={{ uri: 'https://i.imgur.com/UmZuZ9o.png'}}
        />
            {/* <Text style={textStyle}>{props.headerText}</Text> */}
        </View>
    );
};

const styles = {
    viewStyle: {
      backgroundColor: '#F8F8F8',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      paddingTop: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2
    },
    textStyle: {
      fontSize: 25
      
    }
  };

//make the component available to other parts of the app

export { Header };