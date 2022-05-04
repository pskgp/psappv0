import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { auth, firestore } = firebase;

export default function Profile() {

    // const userData =  AsyncStorage.getItem("userData");
    // const data = JSON.parse(userData);
    // console.log(data);
   
  const [name, setName] = useState('loading');
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState(false);
  const [userDoc, setUserDoc] = useState({});

  const getUserInfo = async () => {
    const doc = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid);

    doc
      .get()
      .then((user) => setName(user.data().name || 'anonymous'))
      .then(() => setUserDoc(doc))
      .catch(console.log);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const editInfo = async () => {
    if (editing && !!newName && name !== newName) {
      userDoc
        .set({ name: newName }, { merge: true })
        .then(() => setName(newName))
        .catch(console.log);
    }

    setEditing(!editing);
  };

  const nameInput = (
    <TextInput
      style={styles.input}
      value={newName}
      onChangeText={setNewName}
      placeholder="Username"
    />
  );

  const nameDisplay = <Text style={styles.text}>{name}</Text>;

  const username = editing ? nameInput : nameDisplay;
  const editBtnTitle = editing ? 'Save Changes' : 'Edit Info';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PSAPP!</Text>
      <Text style={styles.text}>You're signed in!</Text>
      <View style={styles.attrContainer}>
        <Text style={styles.text}>Name: </Text>
        {username}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Log Out" onPress={() => auth().signOut()} />
        <Button title={editBtnTitle} onPress={editInfo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  attrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 22,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 22,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
    marginTop: 30,
  },
});
// punit.kumar1661@gmail.com