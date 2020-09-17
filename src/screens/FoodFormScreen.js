import React, { Component } from "react";
import FoodForm from "../ui/FoodForm";
export default class FoodFormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    return {
      title: navigation.getParam("food") ? "Edit Food" : "New Food",
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
    console.log(currentFood, "nutsonyachin");
    if (currentFood) {
      this.setState((prevState) => ({ food: (prevState.food = currentFood) }));
    }
  }

  onFoodUpdated = (food) => {
    console.log(food, "foooooooooooooood");
    this.props.navigation.popToTop();
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
      console.log(this.state.subIngredients, "batman hoohoho");
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
        // setFoodName={this.setFoodName}
        // setCategory={this.setCategory}
        // setBoughtPrice={this.setBoughtPrice}
        // setSellPrice={this.setSellPrice}
        // ingredientArray={this.state.subIngredients}
        setSubIngredients={this.setCurrentSubIngredient}
        submitSubIngredients={this.submitSubIngredients}
        food={this.state.food}
        onFoodAdded={this.props.navigation.state.params}
        onFoodUpdated={this.onFoodUpdated}
      />
    );
  }
}
