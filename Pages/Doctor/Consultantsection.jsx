import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function ConsultantsectionDoc({ route }) {
  const navigation = useNavigation();
  const { appointmentDetails } = route.params;

  const handleVideoCall = () => {
    // Add logic to initiate a video call
    // For now, let's just navigate to the 'VideoCall' page
    navigation.navigate('VideoCall');
  };

  return (
    <View style={styles.container}>
    <Image source={{ uri: appointmentDetails.image }} style={styles.patientImage} />
    <View style={styles.appointmentDetails}>
      <Text style={styles.patientName}>{appointmentDetails.name}</Text>
      <Text style={styles.detailText}>Contact: {appointmentDetails.contact}</Text>
      <Text style={styles.detailText}>Time: {appointmentDetails.time}</Text>
      <Text style={styles.detailText}>Day: {appointmentDetails.day}</Text>
      <Text style={styles.detailText}>Price: {appointmentDetails.price}</Text>

      {/* Video Call Button */}
      <TouchableOpacity style={styles.videoCallButton} onPress={handleVideoCall}>
        <Text style={styles.videoCallButtonText}>Initiate Video Call</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#50ac8c',
    padding: 20,
    alignItems: 'center',
  },
  patientImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  appointmentDetails: {
    alignItems: 'center',
  },
  patientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  videoCallButton: {
    backgroundColor: '#ffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  videoCallButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ConsultantsectionDoc;
