import React, { Component } from "react";
import FoodForm from "../ui/FoodForm";
export default class FoodFormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    return {
      title: "New Food",
    };
  };

  state = {
    food: {
      name: null,
      category: null,
      sellPrice: null,
      location: null,
      subIngredients: [],
    },
    currentSubIngredient: null,
  };

  // setFoodName = (text) => {
  //   this.setState((prevState) => ({
  //     foodName: (prevState.foodName = text),
  //   }));
  // };

  // setCategory = (text) => {
  //   this.setState((prevState) => ({
  //     category: (prevState.category = text),
  //   }));
  // };

  // setBoughtPrice = (text) => {
  //   this.setState((prevState) => ({
  //     boughtPrice: (prevState.boughtPrice = text),
  //   }));
  // };

  // setSellPrice = (text) => {
  //   this.setState((prevState) => ({
  //     sellPrice: (prevState.sellPrice = text),
  //   }));
  // };

  // setLocation = (text) => {
  //   this.setState((prevState) => ({
  //     location: (prevState.location = text),
  //   }));
  // };

  setCurrentSubIngredient = (text) => {
    this.setState((prevState) => ({
      currentSubIngredient: (prevState.currentSubIngredient = text),
    }));
  };

  submitSubIngredients = () => {
    let ingredient = this.state.currentSubIngredient;

    if (ingredient && ingredient.length > 2) {
      this.setState((prevState) => ({
        subIngredients: [...prevState.subIngredients, ingredient],
      }));
    }
  };

  render() {
    return (
      <FoodForm
        // setFoodName={this.setFoodName}
        // setCategory={this.setCategory}
        // setBoughtPrice={this.setBoughtPrice}
        // setSellPrice={this.setSellPrice}
        setSubIngredients={this.setCurrentSubIngredient}
        submitSubIngredients={this.submitSubIngredients}
        ingredientArray={this.state.subIngredients}
        food={this.state.food}
        onFoodAdded={this.props.navigation.state.params}
      />
    );
  }
}
