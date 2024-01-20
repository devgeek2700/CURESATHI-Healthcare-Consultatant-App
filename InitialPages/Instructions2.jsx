import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Instructions2() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2: Schedule an Appointment</Text>
      <Text style={styles.description}>
        Browse doctors, check profiles, and set a date.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Skip"
          onPress={() => navigation.navigate('LoginPatorDoc')}
          color="#716F6F"
        />
        <Button
          title="Next"
          onPress={() => navigation.navigate('Instructions3')}
          color="#247158"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#716F6F',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Instructions2;
