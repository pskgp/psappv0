import React from "react";
import { StyleSheet, Text, View,Image } from "react-native";

const ProfileScreen = ({ route, navigation }) => {
  const result = route.params;
  console.log("user from google",result);
  if (result.hasOwnProperty('googleUser')){
  console.log(result.googleUser.user.name);
  
  return (
    <View>
      <Text>Profile Screen</Text>
      
      <Image
        style={styles.tinyLogo}
        source={{
          uri: result.googleUser.user.photoUrl,
        }}
      />
      
      <Text>Welcome  {result.googleUser.user.name} !!</Text>
      <Text> Add Your Activity </Text>
    </View>
  );
}
else{
  return (
    <View>
      <Text>Profile Screen</Text>
    
      <Image
        style={styles.tinyLogo}
        source={{
          uri: result.user.photoUrl,
        }}
      />
      
      <Text>Welcome  {result.user.name} !!</Text>
      <Text> Add Your Activity </Text>
    </View>
  );
}
};

export default ProfileScreen;

const styles = StyleSheet.create({

  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});