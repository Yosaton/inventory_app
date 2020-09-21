import * as firebase from "firebase";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export function updateFood(food, updateComplete) {
  food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log(food, "updating firebase food");
  firebase
    .firestore()
    .collection("Foods")
    .doc(food.id)
    .set(food)
    .then(() => updateComplete(food))
    .catch((err) => console.log("error"));
}

export function deleteFood(food, deleteComplete) {
  console.log(food);
  firebase
    .firestore()
    .collection("Foods")
    .doc(food.id)
    .delete()
    .then(() => deleteComplete())
    .catch((err) => console.log("error"));
}

export async function getFoods(foodsReceived) {
  var foodList = [];
  var snapshot = await firebase
    .firestore()
    .collection("Foods")
    .orderBy("createdAt")
    .get();
  snapshot.forEach((doc) => {
    const foodItem = doc.data();
    foodItem.id = doc.id;
    foodList.push(foodItem);
  });
  // console.log(foodList, "yesss food");
  foodsReceived(foodList);
}

export function uploadFood(food, onFoodUploaded, { updating }) {
  if (food.imageUri) {
    const fileExtension = food.imageUri.split(".").pop();
    console.log(fileExtension, "file extensionnnnnnnnnnnnnnnnn");
    var uuid = require("random-uuid-v4");
    var uuidv4 = uuid();
    const fileName = `${uuidv4}.${fileExtension}`;
    console.log(food, "IM AM DA FOOOOOOOOOOOOOODS");

    var storageRef = firebase.storage().ref(`foods/images/${fileName}`);
    console.log(storageRef, "storageRefFFFFFFFFFFFFFFFFFF");
    // storageRef.putFile(food.imageUri).on(
    //   firebase.storage.TaskEvent.STATE_CHANGED,
    //   (snapshot) => {
    //     console.log("snapshot:" + snapshot.state);
    //     console.log(
    //       "progress:" + (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
    //       console.log("SUCCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    //     }
    //   },
    //   (error) => {
    //     unsubscribe();
    //     console.log("image upload error " + error.toString());
    //   },
    //   () => {
    //     storageRef.getDownloadURL().then((downloadUrl) => {
    //       console.log("File available at:" + downloadUrl);

    //       if (updating) {
    //         console.log("updating...");
    //         updateFood(food, onFoodUploaded);
    //       } else {
    //         console.log("adding...");
    //         addFood(food, onFoodUploaded);
    //       }
    //     });
    //   }
    // );
    storageRef.put(food.imageUri).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log("snapshot: " + snapshot.state);
        console.log(
          "progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.log("Success");
        }
      },
      (error) => {
        unsubscribe();
        console.log("image upload error: " + error.toString());
      },
      () => {
        storageRef.getDownloadURL().then((downloadUrl) => {
          console.log("File available at: " + downloadUrl);

          food.image = downloadUrl;

          delete food.imageUri;

          if (updating) {
            console.log("Updating....");
            updateFood(food, onFoodUploaded);
          } else {
            console.log("adding...");
            addFood(food, onFoodUploaded);
          }
        });
      }
    );
  } else {
    // delete food.imageUri;
    console.log("skipping image unloaded");
    if (updating) {
      console.log("updating...");
      updateFood(food, onFoodUploaded);
    } else {
      console.log("adding...");
      addFood(food, onFoodUploaded);
    }
  }
}

export function addFood(food, addComplete) {
  console.log(food, "bahahahahahahahHAHAHAHAHAH");
  food.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  firebase
    .firestore()
    .collection("Foods")
    .add(food)
    .then((snapshot) => {
      food.id = snapshot.id;
      snapshot.set(food);
    })
    .then(() => addComplete(food))
    .catch((err) => console.log("error"));
}
