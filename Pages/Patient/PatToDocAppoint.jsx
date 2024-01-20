import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserInfoBox = ({ userData, selectedDate, selectedTime }) => {
  return (
    <View style={styles.userInfoContainer}>
      <Text style={styles.userInfoText}>{`Name: ${userData.name}`}</Text>
      <Text style={styles.userInfoText}>{`Age: ${userData.age}`}</Text>
      <Text style={styles.userInfoText}>{`Location: ${userData.location}`}</Text>
      {/* Add more user information fields as needed */}
      <Text style={styles.userInfoText}>{`Email: ${userData.email}`}</Text>
      <Image source={{ uri: userData.userimage }} style={styles.userImage} />

      {/* Display selected date and time */}
      {selectedDate && (
        <Text style={styles.selectedDateTime}>
          {`Selected Date: ${selectedDate.toDateString()}`}
        </Text>
      )}

      {selectedTime !== '' && (
        <Text style={styles.selectedDateTime}>
          {`Selected Time: ${selectedTime}`}
        </Text>
      )}
    </View>
  );
};

const PatToDocAppoint = ({ route, navigation }) => {
  const { doctorData } = route.params;
  const { bookedAppointments } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [userData, setUserData] = useState(null); // Added user data state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const dayIndex = selectedDate.getDay();
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      setSelectedDay(daysOfWeek[dayIndex]);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const time = new Date(selectedTime);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      setSelectedTime(
        `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`
      );
    }
  };

  const showTimePickerHandler = () => {
    setShowTimePicker(true);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleBookAppointment = async () => {
    if (selectedDate && selectedTime && userData) {
      const newAppointment = {
        id: doctorData.id, // Use the correct identifier for the doctor
        name: doctorData.Doctor,
        time: selectedTime,
        day: selectedDay,
        image: doctorData.imagePath,
        Price: doctorData.Price,
        specialty: doctorData.Specialty,
        date: selectedDate.toDateString(),
        // Include user data in the appointment
        user: {
          name: userData.name,
          age: userData.age,
          location: userData.location,
          userimage: userData.userimage,
        },
      };

      // Save the appointment data to AsyncStorage
      try {
        const storedAppointments = await AsyncStorage.getItem(
          'bookedAppointments'
        );
        const parsedAppointments = storedAppointments
          ? JSON.parse(storedAppointments)
          : [];

        const updatedAppointments = [...parsedAppointments, newAppointment];

        await AsyncStorage.setItem(
          'bookedAppointments',
          JSON.stringify(updatedAppointments)
        );

        // Pass the user information to the DocAppointment page
        navigation.navigate('DocAppointment', { userData });

        // Display success alert
        Alert.alert(
          'Appointment Booked!',
          'Your appointment has been successfully booked.'
        );

        // Navigate back to the previous screen
        navigation.goBack();
      } catch (error) {
        console.error('Error saving appointment:', error);
        // Display error alert
        Alert.alert(
          'Error',
          'Failed to book appointment. Please try again.'
        );
      }
    } else {
      Alert.alert(
        'Error',
        'Please select both date and time before booking.'
      );
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{uri: doctorData.imagePath}} style={styles.doctorImage} />
        <Text style={styles.doctorName}>Name: {doctorData.Doctor}</Text>
        <Text style={styles.doctorDetails}>Specialty: {doctorData.Specialty}</Text>
        <Text style={styles.doctorDetails}>Location: {doctorData.Location}</Text>
        <Text style={styles.doctorDetails}>Experience: {doctorData.Experience}</Text>
        <Text style={styles.doctorDetails}>Price: {doctorData.Price}</Text>

        <View style={styles.ratingsAvailabilityContainer}>
          <Text style={styles.ratings}>{`Ratings: ${doctorData.Ratings}`}</Text>
          <Text
            style={
              styles.availability
            }>{`Availability: ${doctorData.Availability}`}</Text>
        </View>

        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={showDatePickerHandler}>
          <Text style={styles.datePickerButtonText}>Select Date</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={showTimePickerHandler}>
          <Text style={styles.timePickerButtonText}>Select Time</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {selectedDate && (
          <Text style={styles.selectedDateTime}>
            {`Selected Date: ${selectedDate.toDateString()}`}
          </Text>
        )}

        {selectedDay && (
          <Text style={styles.selectedDateTime}>
            {`Selected Day: ${selectedDay}`}
          </Text>
        )}

        {selectedTime !== '' && (
          <Text style={styles.selectedDateTime}>
            {`Selected Time: ${selectedTime}`}
          </Text>
        )}
        <TouchableOpacity
          style={styles.bookAppointmentButton}
          onPress={handleBookAppointment}
          disabled={!selectedDate || !selectedTime}>
          <Text style={styles.bookAppointmentButtonText}>Book Appointment</Text>
        </TouchableOpacity>

        {/* Display user information */}
        <View>
        {userData && (
          <UserInfoBox
            userData={userData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}
        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background color
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Dark text color
  },
  doctorDetails: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  ratingsAvailabilityContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratings: {
    fontSize: 16,
    color: '#3498db',
    marginRight: 10,
  },
  availability: {
    fontSize: 16,
    color: '#27ae60',
  },
  datePickerButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timePickerButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  timePickerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedDateTime: {
    fontSize: 18,
    marginTop: 10,
  },
  bookAppointmentButton: {
    backgroundColor: '#e74c3c',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  bookAppointmentButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  userInfoContainer: {
    marginTop: 20,
    backgroundColor: '#ecf0f1', // Light background color
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Dark text color
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
});

export default PatToDocAppoint;