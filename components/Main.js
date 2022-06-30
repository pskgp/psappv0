import React, { Component, useEffect,useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import   { reload }  from '../redux/actions/index'

// import Profile from '../screens/Profile'
import Profile from './main/Profile';
import Activity from './main/Activity';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// import React, { useEffect, useState } from 'react';
import { View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useDispatch } from 'react-redux';

// import SearchScreen from './main/profile/Search';


const Tab = createMaterialBottomTabNavigator();

function Main(props) {
    // const [currentUser,setCurrentUser] = useState(null);
    // useEffect(() =>{
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(reload());
        }, [dispatch])
    

   
        // firebase.firestore()
        // .collection("users")
        // .doc(firebase.auth().currentUser.uid)
        // .get()
        // .then((snapshot) => {
        //     if(snapshot.exists){
        //         console.log(snapshot.data());
        //         setCurrentUser(snapshot.data());
        //         // dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
        //     }
        //     else{
        //         console.log('does not exist')
        //     }
        // })
        // console.log(currentUser);

    // },[]);
   
    console.log('entering main');
    
    console.log(props);
    if (props.currentUser == null) {
        return (<View> 
            <Text>User Data Not Found</Text>
            </View>)
    }
     
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Tab.Navigator initialRouteName="Activity"

            labeled={false}
            tabBarOptions={{
                showIcon: true, showLabel: false, indicatorStyle: {
                    opacity: 0
                }
            }}
            barStyle={{ backgroundColor: '#ffffff' }}>
            <Tab.Screen key={Date.now()} name="Activity" component={Activity}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }} />
                 <Tab.Screen name="Profile" component={Profile} navigation={props.navigation}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                    }} />
                </Tab.Navigator>

                </View>
    )
            }


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    activity: store.activityReducer.activity
    // friendsRequestsReceived: store.userState.friendsRequestsReceived,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ reload }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);