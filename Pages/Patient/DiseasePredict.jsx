// DiseasePredict.jsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function DiseasePredict({ route }) {
  // Extract answers from route parameters
  const { answers } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Disease Prediction Results</Text>

      {Object.entries(answers).map(([question, answer]) => (
        <Text key={question} style={styles.answerText}>
          {`${question.replace(/_/g, ' ')}: ${answer}`}
        </Text>
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
  answerText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DiseasePredict;
