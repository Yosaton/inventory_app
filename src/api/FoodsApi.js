import * as firebase from "firebase";
import "firebase/firestore";

export function addFood(food, addComplete) {
  firebase
    .firestore()
    .collection("Foods")
    .add({
      name: food.name,
      color: food.color,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((snapshot) => snapshot.get())
    // .then((foodData) => addComplete(foodData())
    .then((data) => addComplete(foodData.data()))
    .catch((err) => console.log(error));
}

export async function getFoods(foodsReceived) {
  var foodList = [];
  var snapshot = await firebase
    .firestore()
    .collection("Foods")
    .orderBy("createdAt")
    .get();
  snapshot.forEach((doc) => {
    foodList.push(doc.data());
  });
  // console.log(foodList, "yesss food");
  foodsReceived(foodList);
}
