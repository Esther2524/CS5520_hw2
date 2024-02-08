import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Colors from '../Colors';
import Button from '../components/Button';


export default function StartScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  function validateEmail(email) {
    return email.includes('@') && email.includes('.');
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
          placeholder="e.g. 1357924689"
        />
        {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title='Reset'
          onPress={handleReset}
          disabled={false}
          textColor={Colors.resetButton} />
        <Button style={styles.button}
          title='Start'
          onPress={handleStart}
          disabled={!email && !phoneNumber}
          textColor={Colors.startButton} />
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
    marginBottom: 30,
    width: '95%',
    height: 80,
    // backgroundColor: 'yellow',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'left',
    marginBottom: 5,
  },
  input: {
    fontSize: 20,
    color: Colors.text,
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 8,
    // backgroundColor: 'red',
  },
  error: {
    color: Colors.errorMessage,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // align buttons in a row
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%',
  },

})