import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import React,{ Component,useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from 'react-native-onboarding-swiper';


// Screens
import LoginScreen from "./screens/LoginScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import GoalsScreen from "./screens/GoalsScreen";
import SignUp from './screens/SignUp';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/store";
import MainScreen from './components/Main';

import { firebaseConfig } from "./screens/config"
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

//React Navigation Setup
import { NavigationContainer } from "@react-navigation/native";
import Profile from './screens/Profile';

export class App extends Component {
  // const [fetchConfig,setFetchConfig] = useState(false);

constructor(props) {
  super()
  this.state = {
    loaded: false,
  }
}

componentDidMount() {
  const  fetchUserConfig = async() => {
    await firebase.firestore()
        .collection("userConfig")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            task = snapshot.data();
            if( task != undefined){
              console.log(task);
            if (task.completed){
              this.setState({
                loggedIn: true,
                loaded: true,
                config:true
              })
            }
            else{
              this.setState({
                loggedIn: true,
                loaded: true,
                config:false
              })
            }
          }
            else{
              this.setState({
                loggedIn: true,
                loaded: true,
                config:false
              })
            }
          }
          
            else{
              this.setState({
                loggedIn: true,
                loaded: true,
                config:false
              })
            }
            
            console.log(this.state);
                // fetchUserConfig();
        })

} 
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user);
    // console.log(firebase.auth().currentUser.uid);
    

    if (!user) {
      this.setState({
        loggedIn: false,
        loaded: true,
        config : false
      })
    } 
    else{
      fetchUserConfig();
    }
    // else {
    //   if (fetchConfig) {
    //     this.setState({
    //       loggedIn: true,
    //       loaded: true,
    //       config:true
    //     })
    //   }
    //   else{
    //     this.setState({
    //       loggedIn: true,
    //       loaded: true,
    //       config: false
    //     })
    //   }
     
    
  })
}
  render() {
    const { loggedIn, loaded,config } = this.state;
    // if (!loaded) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'center' }}>
    //       <Text>Loading</Text>
    //     </View>
    //   )
    // }
    if (!loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Login" component={OnBoardingScreen} navigation={this.props.navigation} /> */}
          <Stack.Screen name="Login" component={LoginScreen} navigation={this.props.navigation} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUp} navigation={this.props.navigation} options={{ headerShown: false }}/>
          {/* <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="NewProfile" component={Profile} /> */}
        </Stack.Navigator>
    </NavigationContainer>
      );
    }

    if (!config) {
      return (
        <Provider store={store}>
        {/* <PersistGate Loading={null} persistor={persistor}>   */}
          <NavigationContainer>
          <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} navigation={this.props.navigation} />
          <Stack.Screen name="Goals" component={GoalsScreen} navigation={this.props.navigation} />
          <Stack.Screen name="Main" component={MainScreen} navigation={this.props.navigation} />
           <Stack.Screen name="NewProfile" component={Profile} navigation={this.props.navigation} />
            {/* <Stack.Screen name="Login" component={LoginScreen} navigation={this.props.navigation} />
            <Stack.Screen name="SignUp" component={SignUp} navigation={this.props.navigation} /> */}
            {/* <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="NewProfile" component={Profile} /> */}
          </Stack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
      </Provider>
      );
    }
  
  return (
    <Provider store={store}>
    {/* <PersistGate Loading={null} persistor={persistor}> */}
      {/* <ThemeProvider theme={theme}> */}
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
       <Stack.Screen name="Main" component={MainScreen} navigation={this.props.navigation} />
        <Stack.Screen name="NewProfile" component={Profile} navigation={this.props.navigation} />
      </Stack.Navigator>
    </NavigationContainer>
        {/* <Routes /> */}
      {/* </ThemeProvider> */}
    {/* </PersistGate> */}
  </Provider>
    
  );
  }
};

export default App;
