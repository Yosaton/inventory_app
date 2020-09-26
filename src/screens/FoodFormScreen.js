import React, { Component } from "react";
import FoodForm from "../ui/FoodForm";

export default class FoodFormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    return {
      title: navigation.getParam("food") ? "Edit Food" : "New Food",
      headerTitleAlign: "center",
    };
  };

  state = {
    food: {
      name: "",
      category: "",
      boughtPrice: "",
      sellPrice: "",
      location: "",
      subIngredients: [],
    },
    currentSubIngredient: null,
  };

  componentDidMount() {
    const currentFood = this.props.navigation.getParam("food");
    if (currentFood) {
      this.setState((prevState) => ({ food: (prevState.food = currentFood) }));
    }
  }

  onFoodUpdated = (food) => {
    this.props.navigation.popToTop();
  };

  setCurrentSubIngredient = (text) => {
    this.setState((prevState) => ({
      currentSubIngredient: (prevState.food.currentSubIngredient = text),
    }));
  };

  submitSubIngredients = () => {
    let ingredient = this.state.currentSubIngredient;

    if (ingredient && ingredient.length > 2) {
      this.setState((prevState) => ({
        food: {
          ...prevState.food,
          subIngredients: [...prevState.food.subIngredients, ingredient],
        },
      }));
    }
  };

  submitSubIngredients = () => {
    let ingredient = this.state.currentSubIngredient;

    if (ingredient && ingredient.length > 2) {
      this.setState((prevState) => ({
        food: {
          ...prevState.food,
          subIngredients: [...prevState.food.subIngredients, ingredient],
        },
      }));
    }
  };

  render() {
    return (
      <FoodForm
        setSubIngredients={this.setCurrentSubIngredient}
        submitSubIngredients={this.submitSubIngredients}
        food={this.state.food}
        onFoodAdded={this.props.navigation.state.params}
        onFoodUpdated={this.onFoodUpdated}
      />
    );
  }
}
