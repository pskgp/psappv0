import React,{Component,useState} from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import Expo from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
import {  Text, TextInput, Alert, ScrollView, Keyboard , SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration, signIn } from '../firebase_utility/firebaseMethods';
// import { useState } from "react/cjs/react.production.min";
const LoginScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setEmail('');
    setPassword('');
  };
  const handlePressSignup = () => {
    navigation.navigate('SignUp')
  };
  const handleSignIn = () => {
    if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    }
    else {
      signIn(
        email,
        password
      );
      navigation.navigate('NewProfile');
      emptyState();
    }
  };
  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id//googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
 const onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);

    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          console.log(credential);
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log('user signed in with info',result.additionalUserInfo);
              if (result.additionalUserInfo.isNewUser) {
                
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(
                    // console.log('Snapshot', snapshot)
                    
                    
                  );
                  navigation.navigate("Profile", {result})
              } else {
                
                
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  })
                  .then(
                    // console.log('Snapshot', snapshot)
                    //navigation.navigate("Profile", {result})
                  );
                 
                navigation.navigate("Profile", {result});
                  
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
          
          
        navigation.navigate("Profile", {googleUser});
        }
      }.bind(this)
    );
  }; 

  const signInAsync = async() => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const result = await Google.logInAsync({
        iosClientId: '815717359489-tsrn2fe8f5p82gcqeoccc560vcqhikos.apps.googleusercontent.com',
        androidClientId: '815717359489-ghovlku6eqremdrjkr26c7nfbtg0nf5p.apps.googleusercontent.com',
      });
      //const [setIsLoading] = useState(false);


      if (result.type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
        console.log(result);
        onSignIn(result)
        // return result.accessToken;
        //let currentUserUID = firebase.auth().currentUser.uid;
        // const [email,familyName,givenName,name,photoUrl,id]=useState('');
        
        
        // const db = firebase.firestore();
        // db.collection("users")
        // .doc(user.id)
        // .set({
        //   email: user.email,
        //   lastName: user.familyName,
        //   firstName: user.givenName,
        //   photoUrl:user.photoUrl,
        //   name:user.name,
        // });
       
        //setIsLoading(true);
        // const credential = firebase.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
        //   user.idToken,
        //   user.accessTokenw
        // );
        // await firebase.auth()
        //   .signInWithCredential(credential) //Login to Firebase
        //   .catch((error) => {
        //     console.log(error);
        //   });

       
      }
      else {
        return { cancelled: true };
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.text}>Create an account </Text>

<ScrollView onBlur={Keyboard.dismiss}>
  
  <TextInput
   style={styles.textInput}
   placeholder="Enter your email*"
   value={email}
   onChangeText={(email) => setEmail(email)}
   keyboardType="email-address"
   autoCapitalize="none"
  />

   <TextInput
   style={styles.textInput}
   placeholder="Enter your password*"
   value={password}
   onChangeText={(password) => setPassword(password)}
   secureTextEntry={true}
  />
  
   <TouchableOpacity style={styles.button} onPress={handlePressSignup}>
    <Text style={styles.buttonText}>Sign Up</Text>
   </TouchableOpacity>

   <TouchableOpacity style={styles.button} onPress={handleSignIn}>
     <Text style={styles.buttonText}>Sign In</Text>
   </TouchableOpacity>
      <Button title="Login with Google" onPress={signInAsync} />
    </ScrollView>  
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  textInput: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: 'white',
    fontWeight: '500'
  }
});