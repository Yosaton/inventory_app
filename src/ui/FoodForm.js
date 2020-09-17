import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
} from "react-native";
import GridList from "../ui/GridList";
import { withFormik } from "formik";
import * as yup from "yup";
import { addFood } from "../api/FoodsApi";

const FoodForm = (props) => {
  return (
    <View style={styles.container}>
      {/* <ScrollView showsHorizontalScrollIndicator={false}> */}
      <TextInput
        style={styles.longFormInput}
        placeholder="Name"
        onChangeText={(text) => {
          props.setFieldValue("Name", text);
        }}
      />
      <TextInput
        style={styles.longFormInput}
        placeholder="Category"
        onChangeText={(text) => {
          props.setFieldValue("Category", text);
        }}
      />
      <TextInput
        style={styles.longFormInput}
        placeholder="Price Bought"
        onChangeText={(text) => {
          props.setFieldValue("Price Bought", text);
        }}
      />
      <TextInput
        style={styles.longFormInput}
        placeholder="Sell Price"
        onChangeText={(text) => {
          props.setFieldValue("Sell Price", text);
        }}
      />
      <TextInput
        style={styles.longFormInput}
        placeholder="Location"
        onChangeText={(text) => {
          props.setFieldValue("Location", text);
        }}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => {
            props.setSubIngredients(text);
          }}
          placeholder="Sub-ingredient"
        />
        <Button
          style={styles.button}
          title="Add"
          onPress={() => {
            props.submitSubIngredients();
          }}
        />
      </View>
      <GridList items={props.ingredientArray} />
      <Button title="Submit" onPress={() => props.handleSubmit()} />
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  container: {
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 32,
  },
  formInput: {
    borderColor: "#B5B4BC",
    borderWidth: 1,
    padding: 8,
    height: 50,
    width: "75%",
    marginBottom: 16,
    marginTop: 16,
  },
  longFormInput: {
    width: "100%",
    height: 50,
    borderColor: "#B5B4BC",
    borderWidth: 1,
    padding: 8,
    margin: 16,
  },
});

export default withFormik({
  // mapPropsToValues: () => ({ name: "", category: "" }),
  // validationSchema: (props) =>
  //   yup.object().shape({
  //     name: yup.string().max(30).required(),
  //     category: yup.string().max(15).required(),
  //   }),
  handleSubmit: (values, { props }) => {
    console.log(props, "props");
    values.subIngredients = props.ingredientArray;
    console.log(values, "vals");
    addFood(values, props.onFoodAdded);
  },
})(FoodForm);

// export default FoodForm;
