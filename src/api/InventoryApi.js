import * as firebase from "firebase";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export function login({ email, password }) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((value) => console.log(value));
}

export function signup({ email, password, displayName }) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log(userInfo);
      userInfo.user
        .updateProfile({ displayName: displayName.trim() })
        .then(() => {});
    });
}

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  });
}

export function signout(onSignedOut) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      onSignedOut();
    });
}

export function updateInventory(inventory, updateComplete) {
  inventory.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log(inventory, "updating firebase inventory");
  firebase
    .firestore()
    .collection("Inventory")
    .doc(inventory.id)
    .set(inventory)
    .then(() => updateComplete(inventory))
    .catch((error) => console.log("error"));
}

export function deleteInventory(inventory, deleteComplete) {
  console.log(inventory);
  firebase
    .firestore()
    .collection("Inventory")
    .doc(inventory.id)
    .delete()
    .then(() => deleteComplete())
    .catch((err) => console.log("error"));
}

export async function getInventory(inventoryReceived) {
  var inventoryList = [];
  var snapshot = await firebase
    .firestore()
    .collection("Inventory")
    .orderBy("createdAt")
    .get();
  snapshot.forEach((doc) => {
    const inventoryItem = doc.data();
    inventoryItem.id = doc.id;
    inventoryList.push(inventoryItem);
  });
  inventoryReceived(inventoryList);
}

export function uploadInventory(inventory, onInventoryUploaded, { updating }) {
  if (inventory.imageUri) {
    const fileExtension = inventory.imageUri.split(".").pop();
    var uuid = require("random-uuid-v4");
    var uuidv4 = uuid();
    const fileName = `${uuidv4}.${fileExtension}`;

    var storageRef = firebase.storage().ref(`inventory/images/${fileName}`);
    fetch(inventory.imageUri)
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        var uploadTask = storageRef.put(blob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            console.log(progress, "this is the progress");
          },
          (error) => {
            console.log(error, "errorrrrrrrr");
          },
          () => {
            storageRef.getDownloadURL().then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);
              inventory.image = downloadUrl;
              delete inventory.imageUri;

              if (updating) {
                console.log("Updating....");
                updateInventory(inventory, onInventoryUploaded);
              } else {
                console.log("adding...");
                addInventory(inventory, onInventoryUploaded);
              }
            });
          }
        );
      });
  } else {
    // delete inventory.imageUri;
    console.log("skipping image uploaded");
    if (updating) {
      console.log("updating...");
      updateInventory(inventory, onInventoryUploaded);
    } else {
      console.log("adding...");
      addInventory(inventory, onInventoryUploaded);
    }
  }
}

export function addInventory(inventory, addComplete) {
  inventory.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  firebase
    .firestore()
    .collection("Inventory")
    .add(inventory)
    .then((snapshot) => {
      inventory.id = snapshot.id;
      snapshot.set(inventory);
    })
    .then(() => addComplete(inventory))
    .catch((err) => console.log("error"));
}
