import React, { Component } from "react";
import ApiKeys from "./constants/ApiKeys";
import LoginScreen from "./src/screens/LoginScreen";
import InventoryListScreen from "./src/screens/InventoryListScreen";
import InventoryFormScreen from "./src/screens/InventoryFormScreen";
import InventoryDetailScreen from "./src/screens/InventoryDetailScreen";
import * as firebase from "firebase";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys);
}

// const navigator = createStackNavigator(
//   {
//     InventoryList: InventoryListScreen,
//     InventoryDetail: InventoryDetailScreen,
//     InventoryForm: InventoryFormScreen,
//   },
//   {
//     initialRouteName: "InventoryList",
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
  InventoryList: InventoryListScreen,
  InventoryForm: InventoryFormScreen,
  InventoryDetail: InventoryDetailScreen,
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
    return <AppContainer screenProps={{ appName: "Maw's App" }} />;
  }
}
