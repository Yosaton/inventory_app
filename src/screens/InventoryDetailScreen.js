import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Divider, Icon } from "react-native-elements";
import { deleteInventory } from "../api/InventoryApi";

class InventoryDetailScreen extends Component {
  static navigationOptions = () => {
    return {
      title: "Craft Details",
      headerTitleAlign: "center",
    };
  };

  render() {
    const inventory = this.props.navigation.getParam("inventory");
    const onInventoryDeleted = this.props.navigation.getParam(
      "inventoryDeletedCallback"
    );

    console.log(inventory);
    return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Icon
              reverse
              name="ios-create"
              type="ionicon"
              onPress={() =>
                this.props.navigation.navigate("InventoryForm", {
                  inventory: inventory,
                })
              }
            />
            <Icon
              reverse
              name="ios-trash"
              type="ionicon"
              color="#CA300E"
              onPress={() =>
                Alert.alert(
                  "Delete?",
                  "Cannot be undone",
                  [
                    { text: "Cancel" },
                    {
                      text: "OK",
                      onPress: () => {
                        deleteInventory(inventory, onInventoryDeleted);
                      },
                    },
                  ],
                  { cancelable: false }
                )
              }
            />
          </View>
          <Image
            style={styles.image}
            source={inventory.image && { uri: inventory.image }}
          />

          <Text style={styles.headerText}>{inventory.name}</Text>
          <Text style={styles.categoryText}>
            Category: {inventory.category}
          </Text>
          <Text style={styles.categoryText}>
            Price Bought: {inventory.boughtPrice}
          </Text>
          <Text style={styles.categoryText}>
            Sell Price: {inventory.sellPrice}
          </Text>
          <Text style={styles.categoryText}>
            Location: {inventory.location}
          </Text>

          <Text style={styles.tagText}>Tags:</Text>
          {inventory.tags === undefined || inventory.tags.length == 0 ? (
            <Text>None</Text>
          ) : (
            <FlatList
              data={inventory.tags}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() => (
                <Divider style={{ backgroundColor: "black" }} />
              )}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.tagItemText}>{item}</Text>
              )}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    marginBottom: 32,
  },
  image: {
    width: "100%",
    aspectRatio: 2,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  categoryText: {
    fontSize: 20,
    marginBottom: 32,
  },
  tagText: {
    fontStyle: "italic",
    fontSize: 18,
    marginBottom: 32,
  },
  tagItemText: {
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  container: {
    alignItems: "center",
    marginBottom: 32,
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: "grey",
  },
});

export default InventoryDetailScreen;
