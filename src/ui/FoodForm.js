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
import { addFood, updateFood, uploadFood } from "../api/FoodsApi";
import CurryImagePicker from "../ui/CurryImagePicker";

const FoodForm = (props) => {
  setFoodImage = (image) => {
    props.setFieldValue("imageUri", image.uri);
    console.log(image.uri, "IMAGEEEEEEEEEEEEEEEEEEEEEEE");
  };
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <CurryImagePicker
          image={props.food.image}
          onImagePicked={setFoodImage}
        />
        <TextInput
          value={props.values.name}
          style={styles.longFormInput}
          placeholder="Name"
          onChangeText={(text) => {
            props.setFieldValue("name", text);
          }}
        />
        <TextInput
          value={props.values.category}
          style={styles.longFormInput}
          placeholder="Category"
          onChangeText={(text) => {
            props.setFieldValue("category", text);
          }}
        />
        <TextInput
          value={props.values.boughtPrice}
          style={styles.longFormInput}
          placeholder="Price Bought"
          onChangeText={(text) => {
            props.setFieldValue("boughtPrice", text);
          }}
        />
        <TextInput
          value={props.values.sellPrice}
          style={styles.longFormInput}
          placeholder="Sell Price"
          onChangeText={(text) => {
            props.setFieldValue("sellPrice", text);
          }}
        />
        <TextInput
          value={props.values.location}
          style={styles.longFormInput}
          placeholder="Location"
          onChangeText={(text) => {
            props.setFieldValue("location", text);
          }}
        />
        <View style={styles.row}>
          <TextInput
            value={props.values.subIngredients}
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
        <GridList items={props.food.subIngredients} />
        <Button title="Submit" onPress={() => props.handleSubmit()} />
      </View>
    </ScrollView>
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
// console.log("sdad")

export default withFormik({
  mapPropsToValues: ({ food }) => ({
    name: food.name,
    category: food.category,
    boughtPrice: food.boughtPrice,
    sellPrice: food.sellPrice,
    location: food.location,
    imageUri: null,
  }),
  enableReinitialize: true,
  // validationSchema: (props) =>
  //   yup.object().shape({
  //     name: yup.string().max(30).required(),
  //     category: yup.string().max(15).required(),
  //   }),
  handleSubmit: (values, { props }) => {
    console.log(
      props,
      "PROPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
    );
    values.subIngredients = props.food.subIngredients;
    console.log(
      values,
      "VALSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
    );

    if (props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      values.image = props.food.image;
      // if (values.image) {
      // }
      uploadFood(values, props.onFoodUpdated, { updating: true });

      // updateFood(values, props.onFoodUpdated);
    } else {
      // addFood(values, props.onFoodAdded);
      uploadFood(values, props.onFoodAdded, { updating: false });
    }
  },
})(FoodForm);

// export default FoodForm;
