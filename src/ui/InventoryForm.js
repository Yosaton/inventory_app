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
import GridList from "./GridList";
import { withFormik } from "formik";
import { uploadInventory } from "../api/InventoryApi";
import MawImagePicker from "./MawImagePicker";

const InventoryForm = (props) => {
  setInventoryImage = (image) => {
    props.setFieldValue("imageUri", image.uri);
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (props.values.location) {
      setSelectedLocation(props.values.location);
    }
  }, [props.values.location]);

  function selectionOnPress(location) {
    setSelectedLocation(location);
  }

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <MawImagePicker
          image={props.inventory.image}
          onImagePicked={setInventoryImage}
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
            value={props.values.tags}
            style={styles.formInput}
            onChangeText={(text) => {
              props.setTags(text);
            }}
            placeholder="Tag (e.g. 'Spring, Christmas, etc')"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.submitTags();
            }}
          >
            <Text style={styles.appButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <GridList style={styles.gridlist} items={props.inventory.tags} />
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
  mapPropsToValues: ({ inventory }) => ({
    name: inventory.name,
    category: inventory.category,
    boughtPrice: inventory.boughtPrice,
    sellPrice: inventory.sellPrice,
    location: inventory.location,
    imageUri: null,
  }),
  enableReinitialize: true,
  handleSubmit: (values, { props }) => {
    values.tags = props.inventory.tags;

    if (props.inventory.id) {
      values.id = props.inventory.id;
      values.createdAt = props.inventory.createdAt;
      if (props.inventory.image) {
        values.image = props.inventory.image;
      }
      uploadInventory(values, props.onInventoryUpdated, { updating: true });
    } else {
      uploadInventory(values, props.onInventoryAdded, { updating: false });
    }
  },
})(InventoryForm);
