import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  Button,
} from "react-native";
import { getInventory, signout } from "../api/InventoryApi";
import { ListItem, Divider } from "react-native-elements";
import ActionButton from "react-native-action-button";

class InventoryList extends Component {
  static navigationOptions = ({ navigation }) => {
    onSignedOut = () => {
      navigation.navigate("Auth");
    };

    return {
      title: "Craft List",
      headerTitleStyle: { alignSelf: "center" },
      headerRight: (
        <Button
          color="#ffb300"
          title="log out"
          onPress={() => signout(onSignedOut)}
        />
      ),
      headerLeft: <View />,
    };
  };

  state = {
    inventoryList: [],
    selectedIndex: 0,
    currentInventoryItem: "",
  };

  onInventoryAdded = (inventory) => {
    this.setState((prevState) => ({
      inventoryList: [...prevState.inventoryList, inventory],
    }));
    this.props.navigation.popToTop();
  };

  onInventoryDeleted = () => {
    const newInventoryList = [...this.state.inventoryList];
    newInventoryList.splice(this.state.selectedIndex, 1);

    this.setState((prevState) => ({
      inventoryList: (prevState.inventoryList = newInventoryList),
    }));

    this.props.navigation.popToTop();
  };

  onInventoryReceived = (inventoryList) => {
    console.log("on inventory received", inventoryList);
    this.setState((prevState) => ({
      inventoryList: (prevState.inventoryList = inventoryList),
    }));
  };

  componentDidMount() {
    getInventory(this.onInventoryReceived);
  }

  showActionButton = () => (
    <ActionButton
      buttonColor="blue"
      onPress={() =>
        this.props.navigation.navigate("InventoryForm", {
          inventoryAddedCallback: this.onInventoryAdded,
        })
      }
    />
  );

  render() {
    return this.state.inventoryList.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.inventoryList}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: "black" }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                title={item.name}
                subtitle={item.category}
                subtitle={item.location}
                leftAvatar={{
                  size: "large",
                  rounded: false,
                  source: item.image && { uri: item.image },
                }}
                onPress={() => {
                  this.setState((prevState) => ({
                    selectedIndex: (prevState.selectedIndex = index),
                  }));
                  this.props.navigation.navigate("InventoryDetail", {
                    inventory: item,
                    inventoryDeletedCallback: this.onInventoryDeleted,
                  });
                }}
              />
            );
          }}
        />
        <ActionButton
          buttonColor="blue"
          onPress={() =>
            this.props.navigation.navigate(
              "InventoryForm",
              this.onInventoryAdded
            )
          }
        />
      </SafeAreaView>
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Crafts found</Text>
        <Text style={styles.emptySubtitle}>
          Add a new craft using the + button below
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
  logoutBtn: {
    marginRight: 8,
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

export default InventoryList;
