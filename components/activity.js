import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Set } from '../components';

export default function Activity({
  activity,
  updateActivity,
  removeActivity,
  idx,
}) {
  const [name, setName] = useState(activity.name);
  const [subcat, setSubcat] = useState(activity.subcat);


  const updateSubcat = (activityIdx, newSubcat) => {
    activity.subcat[activityIdx] = newSubcat;
    updateActivity(idx, { activity: activity.subcat });
    setSubcat(activity.subcat.slice());
  };

  const updateName = (value) => {
    exercise.name = value;
    setName(value);
  };

  const renderItem = ({ item, index }) => {
    return <Subcat subcat={item} updateActivity={updateActivity} idx={index} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={name}
          onChangeText={updateName}
          onEndEditing={() => updateActivity(idx, { name })}
        />
        <View style={styles.toolbar}>
          <View style={styles.setCounter}>
         
            <Text>Add Activity</Text>
            <TouchableOpacity style={styles.btn} onPress={() => changeSetCount()}>
              <Text style={styles.btnTxt}>&gt;</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <FlatList
        style={styles.sets}
        data={sets}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#ecf2ec',
    elevation: -4,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    padding: 2,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    padding: 2,
  },
  setCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    padding: 2,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 4,
  },
  btnTxt: {
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sets: {
    width: '100%',
  },
});