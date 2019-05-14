import React from 'react';
import { TextInput, View, Text} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, autoCapitalize, placeholderTextColor, editable, keyboardType, returnKeyType, onSubmitEditing, ref }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return(
        <View style={containerStyle}>
            
            <TextInput 
            
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                ref={ref}
            />
            
        </View>
    );

};

const styles = {
    inputStyle: {
        color: 'white',
        borderWidth: 2,
        
        borderColor: 'rgba(255,255,255, 0.3)',
        paddingRight: 5,
        paddingLeft: 25,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 40,
        borderRadius: 25
      
    }, 
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export { Input };