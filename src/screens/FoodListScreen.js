import React, { Component } from "react";
import { StyleSheet, FlatList, SafeAreaView, View, Text } from "react-native";
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
    console.log(this.state.selectedIndex, "selected INDEXXXXXXXX");
    const newFoodList = [...this.state.foodList];
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
    return this.state.foodList.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.foodList}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: "black" }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                title={item.name}
                subtitle={item.category}
                leftAvatar={{
                  size: "large",
                  rounded: false,
                  source: item.image && { uri: item.image },
                }}
                onPress={() => {
                  this.setState((prevState) => ({
                    selectedIndex: (prevState.selectedIndex = index),
                  }));
                  this.props.navigation.navigate("FoodDetail", {
                    food: item,
                    foodDeletedCallback: this.onFoodDeleted,
                  });
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
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Foods found</Text>
        <Text style={styles.emptySubtitle}>
          Add a new food using the + button below
        </Text>
        {this.showActionButton()}
      </View>
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
