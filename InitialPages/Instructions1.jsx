import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Instructions1() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Registration/Login</Text>
      <Text style={styles.description}>
        Patient or doctor register or log in with email/phone.
      </Text>
      <View style={styles.buttonContainer}>

      <Button
          title="Skip"
          onPress={() => navigation.navigate('LoginPatorDoc')}
          color="#716F6F" // Set your desired button color
        />
        
        <Button
          title="Next"
          onPress={() => navigation.navigate('Instructions2')}
          color="#247158" // Set your desired button color
        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // Set your desired background color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#247158', // Set your desired text color
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#716F6F', // Set your desired text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Instructions1;
