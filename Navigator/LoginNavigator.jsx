import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import files
import Instructions1 from '../InitialPages/Instructions1';
import Instructions2 from '../InitialPages/Instructions2';
import Instructions3 from '../InitialPages/Instructions3';
import LoginPatorDoc from '../InitialPages/LoginPatorDoc';
import PatLogin from '../InitialPages/PatLogin';
import DocLogin from '../InitialPages/DocLogin';
import PatHome from '../Pages/Patient/PatHome';
import DocHome from '../Pages/Doctor/DocHome';

// Patient imports
import PatHelp from '../Pages/Patient/PatHelp';
import PatLocations from '../Pages/Patient/PatLocations';
import PatProfile from '../Pages/Patient/PatProfile';
import ConsultDoctorScreen from '../Pages/Patient/ConsultDoctorScreen';
import YourDiseaseScreen from '../Pages/Patient/YourDiseaseScreen';
import AllopathyDocRecom from '../Pages/Patient/AllopathyDocRecom';
import AyurvedaDocRecom from '../Pages/Patient/AyurvedaDocRecom';
import HomeopathyDocRecom from '../Pages/Patient/HomeopathyDocRecom';
import PatToDocAppoint from '../Pages/Patient/PatToDocAppoint';
import DiseasePredict from '../Pages/Patient/DiseasePredict';

// Dcotor imports
import DocAppointment from '../Pages/Doctor/DocAppointment';
import DocProfile from '../Pages/Doctor/DocProfile';
import DoctorLocation from '../Pages/Doctor/DoctorLocation';
import Consultantsection from '../Pages/Doctor/Consultantsection';
import VideoCall from '../Pages/Doctor/VideoCall';


//  bottom navbar icons
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Patients Stack pages
function PatStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={PatHome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="YourDisease" component={YourDiseaseScreen} />
      <Stack.Screen name="ConsultDoctor" component={ConsultDoctorScreen} />
      <Stack.Screen name="AllopathyDocRecom" component={AllopathyDocRecom} />
      <Stack.Screen name="AyurvedaDocRecom" component={AyurvedaDocRecom} />
      <Stack.Screen name="HomeopathyDocRecom" component={HomeopathyDocRecom} />
      <Stack.Screen 
      name="PatToDocAppoint" 
      component={PatToDocAppoint} 
      />
      <Stack.Screen name="DiseasePredict" component={DiseasePredict} />
    </Stack.Navigator>
  );
}

// Patients bottom tabs pages

function PatTabNavigator() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#247158',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            paddingVertical: 10,
            borderRadius: 20,
            marginBottom: 10,
            height: 65,
            paddingBottom: 10,
          },
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: 'white',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={PatStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),

            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },

            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Visits"
          component={PatHelp}
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),

            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />

        <Tab.Screen
          name="Locations"
          component={PatLocations}
          options={{
            tabBarIcon: ({color, size}) => (
              <Entypo name="location-pin" size={size} color={color} />
            ),

            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={PatProfile}
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

// Doctor Stack pages
function DocStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={DocHome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="Appointment" component={DocAppointment} />
      <Stack.Screen name="ConsultantsectionDoc" component={Consultantsection} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
    </Stack.Navigator>
  );
}

// Doctor bottom tabs pages

function DocTabNavigator() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#247158',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            paddingVertical: 10,
            borderRadius: 20,
            marginBottom: 10,
            height: 65,
            paddingBottom: 10,
          },
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: 'white',
          },
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={DocStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),

            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />

        <Tab.Screen
          name="Appointment"
          component={DocAppointment}
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),

            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />

        <Tab.Screen
          name="Setting"
          component={DoctorLocation}
          options={{
            tabBarIcon: ({color, size}) => (
              <AntDesign name="setting" size={size} color={color} />
            ),

            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={DocProfile}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome6 name="user-doctor" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#247158',
              color: 'black',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

function LoginNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Instructions1">
        <Stack.Screen
          name="Instructions1"
          component={Instructions1}
          //   options={
          //     {
          //       headerShown: false,
          //     }
          //   }
        />

        <Stack.Screen
          name="Instructions2"
          component={Instructions2}
          //   options={{
          //     headerShown: false,
          //   }}
        />
        <Stack.Screen
          name="Instructions3"
          component={Instructions3}
          //   options={{
          //     headerShown: false,
          //   }}
        />

        <Stack.Screen
          name="LoginPatorDoc"
          component={LoginPatorDoc}
          //   options={{
          //     headerShown: false,
          //   }}
        />

        <Stack.Screen
          name="PatLogin"
          component={PatLogin}
          // options={{
          //     headerShown: false,
          // }}
        />

        <Stack.Screen
          name="DocLogin"
          component={DocLogin}
          // options={{
          //     headerShown: false,
          // }}
        />

        <Stack.Screen
          name="PatHome"
          component={PatTabNavigator}
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="DocHome"
          component={DocTabNavigator}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#247158', // Set your desired background color here
    padding: 10,
  },
});

export default LoginNavigator;