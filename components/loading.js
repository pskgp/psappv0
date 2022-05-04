
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Setting a timer',
  'Require cycle',
  'Non-serializable values were found in the navigation state',
]);

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text>Loading Screen</Text>
      <StatusBar style="auto" />
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
});