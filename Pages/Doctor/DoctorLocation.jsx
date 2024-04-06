import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView,{Marker} from 'react-native-maps';

const places = [
  { id: 1, title: 'Place 1', coordinate: { latitude: 18.236013, longitude: 75.690692 } },
  { id: 2, title: 'Place 2', coordinate: { latitude: 18.229416466803183,  longitude: 75.68417530805834,  } },
  { id: 3, title: 'Place 3', coordinate: { latitude:18.228092213527567,    longitude: 75.68769234472744,  } },
   { id: 4, title: 'Place 4', coordinate: { latitude:18.235514985952367,     longitude:75.67436675233971 ,  } },
   { id: 5, title: 'Place 5', coordinate: { latitude:18.231695109246477,     longitude:  75.6799489264798,  } },
   { id: 6, title: 'Place 6', coordinate: { latitude:18.2355387577985,      longitude:   75.69002978704307,  } },
   { id: 7, title: 'Place 7', coordinate: { latitude:18.2324276500128,       longitude:    75.69235303313822,  } },
];


const DoctorLocation = () =>{


    return (
      <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.7749,
                longitude: -122.4194,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {/* Render markers using the places array */}
              {places.map((place) => (
                <Marker
                  key={place.id}
                  coordinate={place.coordinate}
                   title={place.title}
                            />
                          ))}
                        </MapView>
                      </View>
                    );
                  };

                  // Styles
                  const styles = StyleSheet.create({
                    container: {
                      flex: 1,
                    },
                    map: {
                      flex: 1,
                    },
                  });




export default DoctorLocation;
