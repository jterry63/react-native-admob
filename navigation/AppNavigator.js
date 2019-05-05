import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";
import NewUserScreen from "../screens/NewUserScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

export default createAppContainer(
  createSwitchNavigator({
    Login: LoginScreen,
    NewUser: NewUserScreen,
    ForgotPassword: ForgotPasswordScreen,
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);
