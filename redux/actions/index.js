// import * as Notifications from 'expo-notifications';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { Constants } from 'react-native-unimodules';
import { CLEAR_DATA, USERS_DATA_STATE_CHANGE, USERS_ACTIVITY_STATE_CHANGE, USER_STATE_CHANGE, GET_ACTIVITY } from './actions';
// require('firebase/firestore')

var today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
console.log(date);
let unsubscribe = [];

export function clearData() {
    return ((dispatch) => {
        for (let i = unsubscribe; i < unsubscribe.length; i++) {
            unsubscribe[i]();
        }
        dispatch({ type: CLEAR_DATA })
    })
}
export function reload() {
    console.log('reloading the data ... ')
    return ((dispatch) => {
        // dispatch(clearData())
        dispatch(fetchUser())
        // dispatch(setNotificationService())
        dispatch(fetchUseractivity())
        // dispatch(fetchUserFollowing())
        // dispatch(fetchUserChats())

    })
}

// export const setNotificationService = () => async dispatch => {
//     let token;
//     if (Constants.isDevice) {
//         const existingStatus = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus.status !== 'granted') {
//             const status = await Notifications.requestPermissionsAsync();
//             finalStatus = status;
//         }

//         if (finalStatus.status !== 'granted') {
//             alert('Failed to get push token for push notification!');
//             return;
//         }
//         token = (await Notifications.getExpoPushTokenAsync());
//     } else {
//         alert('Must use physical device for Push Notifications');
//     }

//     if (Platform.OS === 'android') {
//         Notifications.setNotificationChannelAsync('default', {
//             name: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }

//     Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//             shouldShowAlert: true,
//             shouldPlaySound: false,
//             shouldSetBadge: false,
//         }),
//     });

//     if (token != undefined) {
//         firebase.firestore()
//             .collection("users")
//             .doc(firebase.auth().currentUser.uid)
//             .update({
//                 notificationToken: token.data,
//             })
//     }

// }

// export const sendNotification = (to, title, body, data) => dispatch => {
//     if (to == null) {
//         return;
//     }

//     let response = fetch('https://exp.host/--/api/v2/push/send', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             to,
//             sound: 'default',
//             title,
//             body,
//             data
//         })
//     })

// }

export function fetchUser() {
    return ((dispatch) => {
        // console.log(firebase.auth().currentUser.uid);
       let listener =  firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid.toString())
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    // console.log(snapshot);
                    dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else{
                    console.log('does not exist')
                }
            })
            unsubscribe.push(listener);
    })
}


// export function fetchUserChats() {
//     return ((dispatch) => {
//         let listener = firebase.firestore()
//             .collection("chats")
//             .where("users", "array-contains", firebase.auth().currentUser.uid)
//             .orderBy("lastMessageTimestamp", "desc")
//             .onSnapshot((snapshot) => {
//                 let chats = snapshot.docs.map(doc => {
//                     const data = doc.data();
//                     const id = doc.id;
//                     return { id, ...data }
//                 })

//                 for (let i = 0; i < chats.length; i++) {
//                     let otherUserId;
//                     if (chats[i].users[0] == firebase.auth().currentUser.uid) {
//                         otherUserId = chats[i].users[1];
//                     } else {
//                         otherUserId = chats[i].users[0];
//                     }
//                     dispatch(fetchUsersData(otherUserId, false))
//                 }

//                 dispatch({ type: USER_CHATS_STATE_CHANGE, chats })
//             })
//         unsubscribe.push(listener)
//     })
// }
export function fetchUseractivity() {
    
    return ((dispatch) => {
       let listener =  firebase.firestore()
            .collection("activity")
            .doc(firebase.auth().currentUser.uid)
            .collection(date)
            .get()
            .then((snapshot) => {
                // console.log(date);
                // console.log(snapshot.docs);
                let action = snapshot.docs.map(doc => {
                    // console.log(doc.id);
                    const data = doc.data();
                    // console.log(data);
                    const id = doc.id;
                    return { id, ...data }
                })
                console.log( 'dispacting action to render : ',action);
                dispatch({ type: GET_ACTIVITY, activity: action })
            })
            unsubscribe.push(listener);
    })
}


// export function fetchUserFollowing() {
//     return ((dispatch) => {
//         let listener = firebase.firestore()
//             .collection("following")
//             .doc(firebase.auth().currentUser.uid)
//             .collection("userFollowing")
//             .onSnapshot((snapshot) => {
//                 let following = snapshot.docs.map(doc => {
//                     const id = doc.id;
//                     return id
//                 })
//                 dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
//                 for (let i = 0; i < following.length; i++) {
//                     dispatch(fetchUsersData(following[i], true));
//                 }
//             })
//         unsubscribe.push(listener)
//     })
// }

export function fetchUsersData(uid, getactivity) {
    return ((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);
        if (!found) {
            firebase.firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        let user = snapshot.data();
                        user.uid = snapshot.id;

                        dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                    }
                })
            if (getactivity) {
                dispatch(fetchUsersFollowingactivity(uid));
            }
        }
    })
}

// export function fetchUsersFollowingactivity(uid) {
//     return ((dispatch, getState) => {
//         firebase.firestore()
//             .collection("activity")
//             .doc(uid)
//             .collection("useractivity")
//             .orderBy("creation", "asc")
//             .get()
//             .then((snapshot) => {
//                 const uid = snapshot.docs[0].ref.path.split('/')[1];
//                 const user = getState().usersState.users.find(el => el.uid === uid);


//                 let activity = snapshot.docs.map(doc => {
//                     const data = doc.data();
//                     const id = doc.id;
//                     return { id, ...data, user }
//                 })

//                 for (let i = 0; i < activity.length; i++) {
//                     dispatch(fetchUsersFollowingLikes(uid, activity[i].id))
//                 }
//                 dispatch({ type: USERS_activity_STATE_CHANGE, activity, uid })

//             })
//     })
// }

// export function fetchUsersFollowingLikes(uid, postId) {
//     return ((dispatch, getState) => {
//         let listener = firebase.firestore()
//             .collection("activity")
//             .doc(uid)
//             .collection("useractivity")
//             .doc(postId)
//             .collection("likes")
//             .doc(firebase.auth().currentUser.uid)
//             .onSnapshot((snapshot) => {
//                 const postId = snapshot.id;

//                 let currentUserLike = false;
//                 if (snapshot.exists) {
//                     currentUserLike = true;
//                 }

//                 dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
//             })
//         unsubscribe.push(listener)
//     })
// }



// export function queryUsersByUsername(username) {
//     return ((dispatch, getState) => {
//         return new Promise((resolve, reject) => {
//             if (username.length == 0) {
//                 resolve([])
//             }
//             firebase.firestore()
//                 .collection('users')
//                 .where('username', '>=', username)
//                 .limit(10)
//                 .get()
//                 .then((snapshot) => {
//                     let users = snapshot.docs.map(doc => {
//                         const data = doc.data();
//                         const id = doc.id;
//                         return { id, ...data }
//                     });
//                     resolve(users);
//                 })
//         })
//     })
// }


export function deleteActivity(item) {
    return ((dispatch, getState) => {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('activity')
                .doc(firebase.auth().currentUser.uid)
                .collection("useractivity")
                .doc(item.id)
                .delete()
                .then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                })
        })
    })
}


