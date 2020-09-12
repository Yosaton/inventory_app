import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  ActionButton,
  ListItem,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getFoods, signout } from "../api/FoodsApi";
import { ListItem, Divider } from "react-native-elements";
// import ActionButton from "react-native-action-button";

class FoodList extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   onSignedOut = () => {
  //     navigation.navigate("Auth");
  //   };

  //   return {
  //     title: "Food List",
  //     headerRight: (
  //       <Button title="log out" onPress={() => signout(onSignedOut)} />
  //     ),
  //   };
  // };

  state = {
    foodList: [],
    selectedIndex: 0,
    currentFoodItem: "",
  };

  onFoodAdded = (food) => {
    // this.setState((prevState) => ({
    //   foodList: [...prevState.foodList, food],
    // }));
    // this.props.navigation.popToTop();
    console.log("food");
  };

  onFoodDeleted = () => {
    var newFoodList = [...this.state.foodList];
    newFoodList.splice(this.state.selectedIndex, 1);

    this.setState((prevState) => ({
      foodList: (prevState.foodList = newFoodList),
    }));

    this.props.navigation.popToTop();
  };

  onFoodsReceived = (foodList) => {
    this.setState((prevState) => ({
      foodList: (prevState.foodList = foodList),
    }));
  };

  componentDidMount() {
    getFoods(this.onFoodsReceived);
  }

  // showActionButton = () => (
  //   <ActionButton
  //     buttonColor="blue"
  //     onPress={() =>
  //       this.props.navigation.navigate("FoodForm", {
  //         foodAddedCallback: this.onFoodAdded,
  //       })
  //     }
  //   />
  // );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Add Food"
            value={this.state.currentFoodItem}
            onChangeText={(text) =>
              this.setState((prevState) => ({
                currentFoodItem: (prevState.currentFoodItem = text),
              }))
            }
          />
          <Button title="Submit" style={styles.button} onPress={() => {}} />
        </View>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: "black" }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            console.log(item, "jenkkkkk");
            return (
              <ListItem
                title={item.name}
                subtitle={item.color}
                onPress={() => {}}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 30,
  },
  subtitleStyle: {
    fontSize: 18,
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: "italic",
  },
});

export default FoodList;
