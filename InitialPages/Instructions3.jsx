import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Instructions3() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3: Join the Consultation</Text>
      <Text style={styles.description}>Users can video chat with a Doctor.</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate('LoginPatorDoc')}
        color="#247158" // Set your desired button color
      />
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
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
});

export default Instructions3;
