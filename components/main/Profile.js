import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { container, text, utils } from '../styles';
import { FontAwesome5 } from '@expo/vector-icons';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { connect } from 'react-redux'

function Profile(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const { currentUser, posts } = props;
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
        setUser(currentUser)
        setLoading(false)
    }
    else {
        firebase.firestore()
            .collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    props.navigation.setOptions({
                        title: snapshot.data().username,
                    })

                    setUser({ uid: props.route.params.uid, ...snapshot.data() });
                }
                setLoading(false)

            })
        // firebase.firestore()
        //     .collection("posts")
        //     .doc(props.route.params.uid)
        //     .collection("userPosts")
        //     .orderBy("creation", "desc")
        //     .get()
        //     .then((snapshot) => {
        //         let posts = snapshot.docs.map(doc => {
        //             const data = doc.data();
        //             const id = doc.id;
        //             return { id, ...data }
        //         })
        //         setUserPosts(posts)
        //     })
    }
}, [props.route.params.uid,  props.currentUser])

    console.log(user)

    if (loading) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
                <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#00ff00" />
                <Text style={[text.notAvailable]}>Loading</Text>
            </View>
        )
    }
    if (user === null) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
                <FontAwesome5 style={{ alignSelf: 'center', marginBottom: 20 }} name="dizzy" size={40} color="black" />
                <Text style={[text.notAvailable]}>User Not Found</Text>
            </View>
        )
    }
    return (
        <ScrollView style={[container.container, utils.backgroundWhite]}>
       
        <View style={[container.profileInfo]}>
            <Text>Welcome {user.username}</Text>
            <View style={[utils.noPadding, container.row]}>

                {user.image == 'default' ?
                    (
                        <FontAwesome5
                            style={[utils.profileImageBig, utils.marginBottomSmall]}
                            name="user-circle" size={80} color="black" />
                    )
                    :
                    (
                        <Image
                            style={[utils.profileImageBig, utils.marginBottomSmall]}
                            source={{
                                uri: user.image
                            }}
                        />
                    )
                }

                

            </View>


        </View>

        
    </ScrollView >

    )
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser

    // posts: store.userState.posts
})
export default connect(mapStateToProps, null)(Profile);