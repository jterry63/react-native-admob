import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';


export default createAppContainer(createSwitchNavigator({
  Login: LoginScreen,
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
}));