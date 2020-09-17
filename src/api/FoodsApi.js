import * as firebase from "firebase";
import "firebase/firestore";

export function addFood(food, addComplete) {
  console.log(food, "bahahahahahahahHAHAHAHAHAH");
  food.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  firebase
    .firestore()
    .collection("Foods")
    .add(food)
    .then((snapshot) => snapshot.get())
    .then((foodData) => addComplete(foodData.data()))
    .catch((err) => console.log("error"));
}

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
