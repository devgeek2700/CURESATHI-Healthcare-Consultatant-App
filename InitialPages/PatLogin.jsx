// PatLogin.jsx file

import React, {useState} from 'react';
import {Text, View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummyCredentials = [
  {
    id:1,
    name: 'Neha Singh',
    email: 'neha@gmail.com',
    age: '20',
    location: 'Andheri',
    password: '123',
    userimage:
      'https://img.freepik.com/premium-photo/portrait-woman-glasses-standing-folded-her-hands_2221-5133.jpg',
  },
  {
    id:2,
    name: 'John Deo',
    email: 'john@gmail.com',
    age: '34',
    location: 'Malad',
    password: '123',
    userimage:
      'https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg',
  },
  {
    id:3,
    name: 'Aryan Darade',
    email: 'aryan@gmail.com',
    age: '45',
    location: 'Kandivali',
    password: '123',
    userimage:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  },
  {
    id:4,
    name: 'Rohit Dev',
    email: 'rohit@gmail.com',
    age: '75',
    location: 'Goregaon',
    password: '123',
    userimage:
      'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705708800&semt=ais',
  },
  {
    id:5,
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    age: '50',
    location: 'Borivali',
    password: '123',
    userimage:
      'https://img.freepik.com/free-photo/close-up-portrait-cheerful-glamour-girl-with-cute-make-up-smiling-white-teeth-looking-happy-camera-standing-blue-background_1258-70300.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701216000&semt=ais',
  },
  {
    id:6,
    name: 'Raghav Dev',
    email: 'raghav@gmail.com',
    age: '18',
    location: 'Andheri',
    password: '123',
    userimage:
      'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1700956800&semt=ais',
  },
];

function PatLogin({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Validation Error', 'Email and password are required.');
    } else {
      const user = dummyCredentials.find(
        cred => cred.email === email && cred.password === password,
      );

      if (user) {
        // Save user data in AsyncStorage
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(user));
          console.log('Data saved to AsyncStorage:', user);
        } catch (error) {
          console.error('Error saving data to AsyncStorage:', error);
        }

        // Navigate to PatHome with user data
        navigation.navigate('PatHome', user);
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />

        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default PatLogin;
