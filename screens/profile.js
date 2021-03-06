import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'

import { connect } from 'react-redux'

function Profile(props) {
    const { currentUser } = props;
    console.log({ currentUser })
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>
            </View>

            
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1/3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
    // posts: store.userState.posts
})
export default connect(mapStateToProps, null)(Profile);