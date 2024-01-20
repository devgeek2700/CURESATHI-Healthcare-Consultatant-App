import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginPatorDoc() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>LoginPatorDoc</Text>

      <View style={styles.buttonContainer}>
        <Text style={styles.loginText}>Login as Patient</Text>
        <Button
          title="Patient"
          onPress={() => navigation.navigate('PatLogin')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.loginText}>Login as Doctor</Text>
        <Button
          title="Doctor"
          onPress={() => navigation.navigate('DocLogin')}
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  loginText: {
    marginBottom: 10,
  },
});

export default LoginPatorDoc;
