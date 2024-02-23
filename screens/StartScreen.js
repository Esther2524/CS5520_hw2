import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Colors, fontSize, Padding } from '../Theme';
import PressableButton from '../components/PressableButton';

/*
 * The StartScreen component consists of two main TextInput fields, 
 * one for the email address and one for the phone number.
 * 
 * Two buttons are provided:
 * one to reset, and another to submit the data
 * the 'Start' button is enabled when user types something in one of the TextInputs
*/

export default function StartScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  function validateEmail(email) {
    // this regex checks for the basic pattern of a valid email: 
    // some characters before the '@', at least one character between '@' and '.',
    // and at least two characters after the '.' to ensure a valid email address
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
  }

  function validatePhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
  }


  function handleStart() {
    const isEmailValid = validateEmail(email);
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);

    if (!isEmailValid && !isPhoneNumberValid) {
      setEmailError('Please enter a valid email address.');
      setPhoneError('Please enter a valid phone number.');
    } else if (!isEmailValid) {
      setEmailError('Please enter a valid email address.');
      setPhoneError('');
    } else if (!isPhoneNumberValid) {
      setPhoneError('Please enter a valid phone number.');
      setEmailError('');
    } else {
      setEmailError('');
      setPhoneError('');
      // Navigate to the next screen (Activities) if input is valid
      // Activities is the bottom tab and AllActivities is the first screen
      navigation.navigate('Activities');
    }
  }

  function handleReset() {
    setEmail('');
    setPhoneNumber('');
    setEmailError('');
    setPhoneError('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="e.g. esther@gmail.com"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          placeholder="e.g. 0123456789"
        />
        {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>

        <PressableButton
          onPress={handleReset}
          customStyle={styles.button}
        >
          <Text style={styles.resetButton}>Reset</Text>
        </PressableButton>

        <PressableButton
          onPress={handleStart}
          disabled={!email && !phoneNumber} // return false when either email or phoneNum is provided
          customStyle={styles.button}
        >
          <Text style={(email || phoneNumber) ?
            styles.startButton : styles.initialStartButton}>
            Start</Text>
        </PressableButton>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADBC9F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '95%',
    height: 80,
  },
  label: {
    fontSize: fontSize.inputText,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'left',
    marginBottom: 5,
  },
  input: {
    fontSize: fontSize.inputText,
    color: Colors.text,
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: Padding.inputPadding,
  },
  error: {
    color: Colors.errorMessage,
    fontSize: fontSize.errorText,
  },
  buttonContainer: {
    flexDirection: 'row', // align buttons in a row
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 10,
  },
  button: {
    padding: 8,
  },
  resetButton: {
    fontSize: fontSize.inputText,
    fontWeight: 'bold',
    color: Colors.resetButton,
  },
  startButton: {
    fontSize: fontSize.inputText,
    fontWeight: 'bold',
    color: Colors.startButton,
  },
  initialStartButton: {
    fontSize: fontSize.inputText,
    fontWeight: 'bold',
    color: Colors.initialStartButton,
  }

})