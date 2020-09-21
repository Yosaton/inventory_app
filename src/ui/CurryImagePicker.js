import React, { useState, useEffect } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
// import ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

const CurryImagePicker = ({ image, onImagePicked }) => {
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image]);

  pickImageHandler = () => {
    // ImagePicker.showImagePicker(
    //   { title: "Pick an Image", maxWidth: 800, maxHeight: 600 },
    //   (response) => {
    //     if (response.error) {
    //       console.log("image error");
    //     } else {
    //       console.log("Image: " + response.uri);
    setSelectedImage({ uri: response.uri });
    //       onImagePicked({ uri: response.uri });
    //     }
    //   }
    // );
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        // this.setState({ image: result.uri });
        setSelectedImage({ uri: result.uri });
        onImagePicked({ uri: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <View styels={styles.button}>
        <Button title="Pick an image" onPress={pickImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});

export default CurryImagePicker;
