import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import AdScreen from "../screens/AdScreen";
import InfoScreen from "../screens/InfoScreen";
import NewUserScreen from "../screens/NewUserScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";


const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarVisible: false
};

const ForgotPasswordStack = createStackNavigator({
  ForgotPassword: ForgotPasswordScreen
});

ForgotPasswordStack.navigationOptions = {
  tabBarVisible: false
};

const NewUserStack = createStackNavigator({
  NewUser: NewUserScreen
});

NewUserStack.navigationOptions = {
  tabBarVisible: false
};

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

const AdStack = createStackNavigator({
  Ads: AdScreen
});

AdStack.navigationOptions = {
  tabBarLabel: "Watch Ads",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-play" : "md-play"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

const InfoStack = createStackNavigator({
  Info: InfoScreen
});

InfoStack.navigationOptions = {
  header: null,
  tabBarLabel: "Info",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? "ios-information-circle-outline"
          : "md-information-circle-outline"
      }
    />
  )
};

export default createBottomTabNavigator({
  AdStack,
  HomeStack,
  InfoStack
});
