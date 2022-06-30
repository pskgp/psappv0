import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import {Alert} from "react-native";
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { container, form } from '../components/styles';
import { Snackbar } from 'react-native-paper';

export default function registration(email, password, lastName, firstName) {
  // try {
    const [isValid, setIsValid] = useState(true);
    const fullname = firstName + lastName;
    const name = firstName;
    console.log(fullname); 
   firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              if (snapshot.exist) {
                  return
              }
              firebase.firestore().collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                      name,
                      email,
                      fullname,
                      image: 'default'

                  })
          })
          .catch(() => {
              setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
          })
    // const currentUser = firebase.auth().currentUser;
  //   try {
  //     await AsyncStorage.setItem("userData", JSON.stringify({
  //       email: currentUser.email,
  //       lastName: lastName,
  //       firstName: firstName,
  //     }));
  //  } catch (error) {
  //    console.log("Something went wrong", error);
  //  }

    // const db = firebase.firestore();
    // db.collection("users")
    //   .doc(currentUser.uid)
    //   .set({
    //     email: currentUser.email,
    //     lastName: lastName,
    //     firstName: firstName,
    //   });
  // } catch (err) {
  //   Alert.alert("There is something wrong!!!!", err.message);
  // }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
export { registration }    