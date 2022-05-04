import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import {Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registration(email, password, lastName, firstName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    try {
      await AsyncStorage.setItem("userData", JSON.stringify({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
      }));
   } catch (error) {
     console.log("Something went wrong", error);
   }

    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password).then(res =>{
           AsyncStorage.setItem("userData", JSON.stringify(res.user));
        }
       
      );

  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}