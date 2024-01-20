import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const YourDiseaseScreen = () => {
  const navigation = useNavigation();

  const [answers, setAnswers] = useState({
    ChestPain: '',
    ShortnessOfBreath: '',
    Fever: '',
    Cough: '',
    Fatigue: '',
    HighBloodPressure: '',
    HighCholesterol: '',
    Diabetes: '',
  });

  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmit = () => {
    setShowAnswers(true);

    // Pass answers to DiseasePredictScreen
    navigation.navigate('DiseasePredict', { answers });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Disease Assessment</Text>

      {Object.keys(answers).map((question) => (
        <View key={question} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.replace(/_/g, ' ')}</Text>
          <View style={styles.answerButtons}>
            <Button
              title="Yes"
              onPress={() => handleAnswerChange(question, 'Yes')}
              color={answers[question] === 'Yes' ? 'green' : undefined}
            />
            <Button
              title="No"
              onPress={() => handleAnswerChange(question, 'No')}
              color={answers[question] === 'No' ? 'red' : undefined}
            />
          </View>
        </View>
      ))}

      <Button title="Check Disease" onPress={handleSubmit} />

      {/* Display Answers */}
      {showAnswers && Object.entries(answers).length > 0 && (
        <View>
          <Text style={styles.answersHeading}>Your Answers:</Text>
          {Object.entries(answers).map(([question, answer]) => (
            <Text key={question} style={styles.answerText}>
              {`${question.replace(/_/g, ' ')}: ${answer}`}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
  },
  answerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  answersHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  answerText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default YourDiseaseScreen;
