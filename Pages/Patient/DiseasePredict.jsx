// DiseasePredict.jsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AllopathyDocData from '../../Data/AllopathyDocData';

function DiseasePredict({ route }) {
  const { answers } = route.params;
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const locations = [
    'Malad',
    'Andheri',
    'Borivali',
    'Bavi',
    'Goregaon',
    'Kandivali',
    'Agalgaon',
  ];

  const diseases = ['General Practitioner', 'Cardiovascular', 'Respiratory'];

  // Function to filter doctors based on selected location and disease
  useEffect(() => {
    const filterDoctors = () => {
      const filteredList = AllopathyDocData.filter(
        (doc) =>
          doc.Location === selectedLocation && doc.Specialty === selectedDisease
      );
      setFilteredDoctors(filteredList);
    };

    // Call the filterDoctors function when both location and disease are selected
    if (selectedLocation && selectedDisease) {
      filterDoctors();
    }
  }, [selectedLocation, selectedDisease]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Disease Prediction Results</Text>

      {/* Location Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Location:</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedLocation}
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}>
          {locations.map((location, index) => (
            <Picker.Item key={index} label={location} value={location} />
          ))}
        </Picker>
      </View>

      {/* Disease Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Disease:</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedDisease}
          onValueChange={(itemValue) => setSelectedDisease(itemValue)}>
          {diseases.map((disease, index) => (
            <Picker.Item key={index} label={disease} value={disease} />
          ))}
        </Picker>
      </View>

      {/* Display filtered doctors */}
      {filteredDoctors.map((doctor) => (
        <View key={doctor.Doctor_ID} style={styles.doctorCard}>
          {/* Display doctor information */}
          <Text>{`Doctor: ${doctor.Doctor}`}</Text>
          <Text>{`Specialty: ${doctor.Specialty}`}</Text>
          <Text>{`Location: ${doctor.Location}`}</Text>
          {/* Add more information as needed */}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    height: 40,
  },
  doctorCard: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default DiseasePredict;
