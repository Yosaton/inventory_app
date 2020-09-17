import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ApiKeys from "./constants/ApiKeys";
import FoodListScreen from "./src/screens/FoodListScreen";
import FoodFormScreen from "./src/screens/FoodFormScreen";
import FoodDetailScreen from "./src/screens/FoodDetailScreen";
import * as firebase from "firebase";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// const AppStack = createStackNavigator({
//   FoodList: FoodListScreen,
//   // FoodForm: FoodFormScreen,
//   FoodDetail: FoodDetailScreen,
// });

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: DetailsScreen,
//   },
//   {
//     initialRouteName: "Home",
//   }
// );

// const AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       App: AppStack,
//       Auth: AuthNavigator,
//     },
//     {
//       initialRouteName: "Auth",
//     }
//   )
// );

// export default function App() {
//   if (!firebase.apps.length) {
//     firebase.initializeApp(ApiKeys);
//   }

//   function storeHighScore() {
//     firebase.database().ref("Test-").set({
//       test: "blahblah",
//     });
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Button title="click me" onClick={storeHighScore()} />
//       <StatusBar style="auto" />

//       <AppContainer screenProps={{ appName: "Coding with Curry" }} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

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
      title: "Maws App",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
