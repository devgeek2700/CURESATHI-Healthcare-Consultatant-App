import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DocAppointment() {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem(
          'bookedAppointments',
        );
        const parsedAppointments = storedAppointments
          ? JSON.parse(storedAppointments)
          : [];

        setAppointments(parsedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const renderAppointmentItem = ({item}) => (
    <View style={styles.appointmentItem}>
      {item.user && (
        <Image source={{uri: item.user.userimage}} style={styles.userImage} />
      )}

      <View>
        {item.user && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.patientName}>User Name: {item.user.name}</Text>
            <Text style={styles.userInfoText}>User Age: {item.user.age}</Text>
            <Text style={styles.userInfoText}>
              User Location: {item.user.location}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleAccept(item)}>
            <Text style={styles.buttonText}>APPOINTMENT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Check if item.user exists before accessing its properties */}
    </View>
  );

  const handleAccept = item => {
    navigation.navigate('ConsultantsectionDoc', {appointmentDetails: item});
  };

  const handleReject = (item) => {
    // Filter out the rejected item and update the state
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== item.id,
    );
  
    // Save the updated list to AsyncStorage
    AsyncStorage.setItem(
      'bookedAppointments',
      JSON.stringify(updatedAppointments),
    )
      .then(() => {
        setAppointments(updatedAppointments);
      })
      .catch(error => {
        console.error('Error updating appointments:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Patient Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={item =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={renderAppointmentItem}
        style={styles.list}
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
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  appointmentDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  list: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfoContainer: {
    flex: 1,
  },
  userInfoText: {
    marginBottom: 5,
  },
});

export default DocAppointment;
