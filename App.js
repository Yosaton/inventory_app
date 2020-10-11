import React, { Component } from "react";
import ApiKeys from "./constants/ApiKeys";
import LoginScreen from "./src/screens/LoginScreen";
import FoodListScreen from "./src/screens/FoodListScreen";
import FoodFormScreen from "./src/screens/FoodFormScreen";
import FoodDetailScreen from "./src/screens/FoodDetailScreen";
import * as firebase from "firebase";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys);
}

// const navigator = createStackNavigator(
//   {
//     FoodList: FoodListScreen,
//     FoodDetail: FoodDetailScreen,
//     FoodForm: FoodFormScreen,
//   },
//   {
//     initialRouteName: "FoodList",
//     defaultNavigationOptions: {
//       headerTitleStyle: { alignSelf: "center" },
//       title: "Maws App",
//     },
//   }
// );

// const App = createAppContainer(navigator);

// export default () => {
//   return <App />;
// };

const AppStack = createStackNavigator({
  FoodList: FoodListScreen,
  FoodForm: FoodFormScreen,
  FoodDetail: FoodDetailScreen,
});

const AuthNavigator = createStackNavigator({
  LoginRoute: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: "Auth",
    }
  )
);

export default class App extends Component {
  render() {
    return <AppContainer screenProps={{ appName: "Coding with Curry" }} />;
  }
}
