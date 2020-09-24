import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ApiKeys from "./constants/ApiKeys";
import FoodListScreen from "./src/screens/FoodListScreen";
import FoodFormScreen from "./src/screens/FoodFormScreen";
import FoodDetailScreen from "./src/screens/FoodDetailScreen";
import * as firebase from "firebase";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys);
}

const navigator = createStackNavigator(
  {
    FoodList: FoodListScreen,
    FoodDetail: FoodDetailScreen,
    FoodForm: FoodFormScreen,
  },
  {
    initialRouteName: "FoodList",
    defaultNavigationOptions: {
      headerTitleStyle: { alignSelf: "center" },
      title: "Maws App",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
