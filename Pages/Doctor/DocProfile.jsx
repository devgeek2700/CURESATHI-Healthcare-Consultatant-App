import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

function DocProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
          }}
          style={styles.doctorImage}
        />
        <View style={styles.headerText}>
          <Text style={styles.doctorName}>Dr. John Doe</Text>
          <Text style={styles.specialist}>Cardiologist</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Age</Text>
          <Text style={styles.detailValue}>35</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Experience</Text>
          <Text style={styles.detailValue}>10+ years</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Location</Text>
          <Text style={styles.detailValue}>Mumbai, Maharashtra</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Specialist</Text>
          <Text style={styles.detailValue}>Cardiologist</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Education</Text>
          <Text style={styles.detailValue}>M.B.B.S</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Additional Degree</Text>
          <Text style={styles.detailValue}>M.D. (Cardiology)</Text>
        </View>
      </View>

      <View style={styles.thoughtsContainer}>
        <Text style={styles.thoughtsTitle}>Thoughts</Text>
        <Text style={styles.thoughtsText}>
          "Providing compassionate care and personalized treatment to enhance
          the well-being of my patients is my utmost priority. I believe in
          integrating modern medical knowledge with a holistic approach to
          promote a healthy lifestyle."
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>View Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Consultation History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  specialist: {
    fontSize: 18,
    color: '#555',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  thoughtsContainer: {
    marginBottom: 20,
  },
  thoughtsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  thoughtsText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#247158',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  linkText: {
    color: '#247158',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default DocProfile;
