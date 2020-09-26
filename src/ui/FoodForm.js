import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import GridList from "../ui/GridList";
import { withFormik } from "formik";
import { addFood, updateFood, uploadFood } from "../api/FoodsApi";
import CurryImagePicker from "../ui/CurryImagePicker";

const FoodForm = (props) => {
  console.log(props, "props in ur ass");
  setFoodImage = (image) => {
    console.log(image, "IMAGEEEEEEEEEEEEEEEEEEEEEEE");
    console.log(props, "props-asshole");
    props.setFieldValue("imageUri", image.uri);
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (props.values.location) {
      console.log("useEffectnutsack " + props.values.location);
      setSelectedLocation(props.values.location);
    }
  }, [props.values.location]);

  function selectionOnPress(location) {
    console.log(location);
    setSelectedLocation(location);
    console.log(selectedLocation, "selectedLocation");
  }

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
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <TouchableHighlight
            style={[
              styles.locationButtonNormal,
              {
                backgroundColor:
                  selectedLocation === "Princeton" ? "green" : "gray",
              },
            ]}
            onPress={() => {
              selectionOnPress("Princeton"),
                props.setFieldValue("location", "Princeton");
            }}
          >
            <Text style={styles.appButtonText}>Princeton</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              styles.locationButtonNormal,
              {
                backgroundColor:
                  selectedLocation === "Henderson" ? "green" : "gray",
              },
            ]}
            onPress={() => {
              selectionOnPress("Henderson"),
                props.setFieldValue("location", "Henderson");
            }}
          >
            <Text style={styles.appButtonText}>Henderson</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.container2}>
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

        <View style={styles.row}>
          <TextInput
            value={props.values.subIngredients}
            style={styles.formInput}
            onChangeText={(text) => {
              props.setSubIngredients(text);
            }}
            placeholder="Sub-ingredient"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.submitSubIngredients();
            }}
          >
            <Text style={styles.appButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <GridList style={styles.gridlist} items={props.food.subIngredients} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.handleSubmit()}
        >
          <Text style={styles.appButtonText}>Submit</Text>
        </TouchableOpacity>
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
  container2: {
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 64,
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
  button: {
    elevation: 8,
    backgroundColor: "#0000FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  locationContainer: {
    width: 300,
    alignSelf: "center",
  },
  locationRow: {
    width: "100%",
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationButtonNormal: {
    width: 140,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
  },
  locationButtonPressed: {
    width: 140,
    elevation: 8,
    backgroundColor: "#ADFF2F",
    borderRadius: 10,
    paddingVertical: 10,
  },
});

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

    console.log(props.food.id, "gizmo");

    if (props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      if (props.food.image) {
        values.image = props.food.image;
      }
      uploadFood(values, props.onFoodUpdated, { updating: true });
    } else {
      uploadFood(values, props.onFoodAdded, { updating: false });
    }
  },
})(FoodForm);
