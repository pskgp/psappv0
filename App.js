import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


// Screens
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignUp from './screens/SignUp';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { firebaseConfig } from "./screens/config"
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

//React Navigation Setup
import { NavigationContainer } from "@react-navigation/native";
import Profile from './screens/Profile';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="NewProfile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
