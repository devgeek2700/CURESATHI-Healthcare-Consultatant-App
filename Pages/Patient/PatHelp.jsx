// PatHelp.jsx
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PatHelp({ route }) {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem('bookedAppointments');
        const parsedAppointments = storedAppointments ? JSON.parse(storedAppointments) : [];

        // Add a default value for 'id' if not present
        const appointmentsWithId = parsedAppointments.map((item, index) => ({
          ...item,
          id: item.id || index + 1,
        }));

        setBookedAppointments(appointmentsWithId);
        setFilteredAppointments(appointmentsWithId);
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleRemoveAppointment = async (id) => {
    try {
      const updatedAppointments = bookedAppointments.filter((item) => item.id !== id);

      setBookedAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);

      // Update AsyncStorage
      await AsyncStorage.setItem('bookedAppointments', JSON.stringify(updatedAppointments));
    } catch (error) {
      console.error('Error removing appointment:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Booked Appointments</Text>
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Image source={{ uri: item.image }} style={styles.doctorImage} />
            <View style={styles.appointmentDetails}>
              <Text style={styles.doctorName}>{`Doctor: ${item.name}`}</Text>
              <Text>{`Time: ${item.time}`}</Text>
              <Text>{`Day: ${item.day}`}</Text>
              <Text>{`Date: ${item.date}`}</Text>
              <Text>Price: $60</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveAppointment(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#247158',
    padding: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  appointmentDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: '#FF4F4F',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PatHelp;
