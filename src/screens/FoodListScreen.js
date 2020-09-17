import React, { Component } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { getFoods } from "../api/FoodsApi";
import { ListItem, Divider } from "react-native-elements";
import ActionButton from "react-native-action-button";

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
    this.setState((prevState) => ({
      foodList: [...prevState.foodList, food],
    }));
    this.props.navigation.popToTop();
    console.log("bit bugg", this.state.foodList);
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
    console.log("on foods received", foodList);
    this.setState((prevState) => ({
      foodList: (prevState.foodList = foodList),
    }));
    // console.log(this.state.foodList, "state foodlist");
  };

  componentDidMount() {
    getFoods(this.onFoodsReceived);
  }

  showActionButton = () => (
    <ActionButton
      buttonColor="blue"
      onPress={() =>
        this.props.navigation.navigate("FoodForm", {
          foodAddedCallback: this.onFoodAdded,
        })
      }
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: "black" }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.name}
                subtitle={item.category}
                onPress={() => {
                  this.props.navigation.navigate("FoodDetail", { food: item });
                }}
              />
            );
          }}
        />
        <ActionButton
          buttonColor="blue"
          onPress={() =>
            this.props.navigation.navigate("FoodForm", this.onFoodAdded)
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FoodList;
