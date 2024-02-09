import { StyleSheet, Text, View, TextInput, Platform, Alert } from 'react-native';
import React from 'react';
import { useState, useContext } from 'react';
import DropdownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivitiesContext } from '../context/ActivitiesProvider';
import Colors from '../Colors';
import Button from '../components/Button';

const items = [
  { label: 'Walking', value: 'Walking' },
  { label: 'Running', value: 'Running' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Weights', value: 'Weights' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Hiking', value: 'Hiking' }
];

/*
 * adding route as a parameter to the AddActivity is important
 * then I'll have access to the route object containing the navigation parameters, 
 * especially the isSpecial parameter that I want to use in the handleAddActivity function.
*/
export default function AddActivity({ navigation, route }) {
  // open is a boolean state that controls whether the dropdown is open or closed.
  const [open, setOpen] = useState(false);
  // set date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  // the attributes of an activity
  const [type, setType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  // addActivity is a function defined within my ActivitiesProvider component
  const { addActivity } = useContext(ActivitiesContext);

  function validateInput(type, duration, date) {
    let errorMessage = '';
    // check if the activity type is selected
    if (!type) {
      errorMessage += 'Activity type is required.\n';
    }
    // check if duration is a positive number
    if (!duration || isNaN(duration) || parseInt(duration, 10) < 0) {
      errorMessage += 'Duration must be a positive number.\n';
    }
    // check if date is selected
    if (!date) {
      errorMessage += 'Date is required.\n';
    }
    if (errorMessage) {
      Alert.alert('Invalid Input', errorMessage, [{ text: 'OK' }]);
      return false;
    }
    return true;
  }


  function handleAddActivity() {
    if (!validateInput(type, duration, date)) return;

    // 1. if the activity is being added from the SpecialActivities screen, mark it as special
    if (route && route.params && route.params.isSpecial) {
      addActivity({
        type,
        duration: parseInt(duration, 10),
        date: formatDate(date),
        id: Date.now().toString(),
        isSpecial: true, // explicitly set isSpecial to true for activities from SpecialActivities
      });
    } else {
      // use the calculated isSpecial value for activities from AllActivities screens
      const isSpecial = (type === 'Running' || type === 'Weights') && parseInt(duration, 10) > 60;
      addActivity({
        type,
        duration: parseInt(duration, 10),
        date: formatDate(date),
        id: Date.now().toString(),
        isSpecial,
      });
    }

    // return to the previous screen after adding
    navigation.goBack();
  };

  // return to the previous screen
  function handleCancel() {
    navigation.goBack();
  }



  /*
   * user interaction flow for date picker:
   * when the user focuses on the related input (triggering handleFocus), showDatePicker becomes true, displaying the picker.
   * Once the user selects a date, onChangeDate updates date and sets showDatePicker to false, hiding the picker.
  */
  function handleFocus() {
    setShowDatePicker(true);
    if (date === null) {
      setDate(new Date()); // temporarily set to the current date when first opened
    }
  };

  // hide the picker after selection
  function onChangeDate(event, selectedDate) {
    setShowDatePicker(false); // hide the picker
    if (selectedDate) {
      setDate(selectedDate); // update the date only if a new date is selected
    }
  }


  // format date to a readable string year-month-day
  function formatDate(date) {
    if (date === null) return;
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    const year = date.toLocaleString('en-US', { year: 'numeric' });
    return `${weekday} ${month} ${day} ${year}`;
  }





  return (
    <View style={styles.container}>

      <View style={styles.dropdownContainer}>
        <Text style={styles.text}>Activity *</Text>
        <DropdownPicker
          open={open}
          value={type} // the currently selected value (the type of activity)
          items={items} // the list of items to choose from
          setOpen={setOpen} // function to open/close the dropdown
          setValue={setType} // function to update the selected value
          placeholder="Select an Activity"
          style={styles.dropdown}
          labelStyle={{
            fontSize: 16,
            color: Colors.text,
          }}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Duration(min) *</Text>
        <TextInput
          style={styles.textInput}
          value={duration}
          onChangeText={setDuration}
          keyboardType='numeric'
        />
      </View>


      <View style={styles.dateContainer}>
        <Text style={styles.text}>Date *</Text>
        <TextInput
          style={styles.textInput}
          value={formatDate(date) || ''} // display formatted date or empty if null (first go to this screen)
          onFocus={handleFocus}
        />
        {
          showDatePicker && <DateTimePicker
            style={styles.datePicker}
            // DateTimePicker requires a valid date for its value prop at all times, but I want the picker not to show a date until the user has chosen one
            value={date || new Date()} // so I use current date as fallback if date is null
            mode='date'
            display='inline'
            onChange={onChangeDate}
          />
        }
      </View>


      <View style={styles.buttonContainer}>
        <Button
          onPress={handleCancel}
          title='Cancel'
          disabled={false}
          textColor={Colors.cancelButton}
        />
        <Button
          onPress={handleAddActivity}
          title='Save'
          disabled={false}
          textColor={Colors.saveButton}
        />
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screen,
    alignItems: 'center',
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.addText,
  },
  dropdownContainer: {
    width: '90%',
    marginBottom: 30,
    marginTop: 50,
    zIndex: 1000, // ensure this container is above other screen elements
    // backgroundColor: 'yellow',
  },
  dropdown: {
    backgroundColor: Colors.dropdownBackground,
    height: 50,
    zIndex: 1000, // DropdownPicker itself needs higher stacking context
  },
  textInputContainer: {
    marginBottom: 30,
    width: '90%',
    // backgroundColor: 'yellow',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.text,
    height: 50,
    padding: 10,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.dropdownBackground,
  },
  dateContainer: {
    width: '90%',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    width: '90%',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },

})