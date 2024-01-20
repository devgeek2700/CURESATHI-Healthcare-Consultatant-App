import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PatProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          console.log('Data retrieved from AsyncStorage:', parsedData);
        } else {
          console.log('No data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <View style={styles.header}>
            <Image
              source={{uri: userData.userimage}}
              style={styles.doctorImage}
            />
            <View style={styles.headerText}>
              <Text style={styles.doctorName}>{userData.name}</Text>
              <Text style={styles.specialist}>{userData.email}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age</Text>
              <Text style={styles.detailValue}>{userData.age}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{userData.location}</Text>
            </View>
          </View>

          <View style={styles.thoughtsContainer}>
            <Text style={styles.thoughtsTitle}>Thoughts</Text>
            <Text style={styles.thoughtsText}>
              {' '}
              "Providing compassionate care and personalized treatment to
              enhance the well-being of my patients is my utmost priority. I
              believe in integrating modern medical knowledge with a holistic
              approach to promote a healthy lifestyle."{' '}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View More</Text>
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
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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

export default PatProfile;
