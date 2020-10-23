import React, { Component } from "react";
import InventoryForm from "../ui/InventoryForm";

export default class InventoryFormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    return {
      title: navigation.getParam("inventory") ? "Edit Craft" : "New Craft",
      headerTitleAlign: "center",
    };
  };

  state = {
    inventory: {
      name: "",
      category: "",
      boughtPrice: "",
      sellPrice: "",
      location: "",
      tags: [],
    },
    currentTag: null,
  };

  componentDidMount() {
    const currentInventory = this.props.navigation.getParam("inventory");
    if (currentInventory) {
      this.setState((prevState) => ({
        inventory: (prevState.inventory = currentInventory),
      }));
    }
  }

  onInventoryUpdated = (inventory) => {
    this.props.navigation.popToTop();
  };

  setCurrentTag = (text) => {
    this.setState((prevState) => ({
      currentTag: (prevState.inventory.currentTag = text),
    }));
  };

  submitTags = () => {
    let tag = this.state.currentTag;

    if (tag && tag.length > 2) {
      this.setState((prevState) => ({
        inventory: {
          ...prevState.inventory,
          tags: [...prevState.inventory.tags, tag],
        },
      }));
    }
  };

  render() {
    return (
      <InventoryForm
        setTags={this.setCurrentTag}
        submitTags={this.submitTags}
        inventory={this.state.inventory}
        // onInventoryAdded={this.props.navigation.state.params}
        onInventoryAdded={this.props.navigation.getParam(
          "inventoryAddedCallback"
        )}
        onInventoryUpdated={this.onInventoryUpdated}
      />
    );
  }
}
