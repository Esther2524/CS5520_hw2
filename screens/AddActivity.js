import { StyleSheet, Text, View, TextInput, Platform, Alert } from 'react-native';
import React from 'react';
import { useState, useContext } from 'react';
import DropdownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivitiesContext } from '../context/ActivitiesProvider';
import { Colors, fontSize, Padding } from '../Theme';
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
export default function AddActivity({ navigation }) {
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
    // use the calculated isSpecial value for activities from AllActivities screens
    const isSpecial = (type === 'Running' || type === 'Weights') && parseInt(duration, 10) > 60;
    addActivity({
      type,
      duration: parseInt(duration, 10),
      date: formatDate(date),
      id: Date.now().toString(),
      isSpecial,
    });
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
  function handlePress() {
    if (showDatePicker) {
      // If the picker is already shown, hide it
      setShowDatePicker(false);
    } else {
      setShowDatePicker(true);
      if (date === null) {
        setDate(new Date()); // Initialize with the current date if not already set
      }
    }
  }


  /* hide the picker after selection
   * date pickers do not consider selecting the same date as a change event, 
   * thus not triggering the onChange or equivalent event handler 
   * if the date hasn't changed from its previous value.
  */
  function onChangeDate(event, selectedDate) {
    setShowDatePicker(false); // hide DateTimePicker after selection, not sure if I need this step
    if (selectedDate) {
      setDate(selectedDate); // update the state with the new date
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
      <View style={styles.view}>
        {/* not sure why, but if I put text and DropdownPicker into a dropdownContainer,
      then the dropdown is not scrollable on Android */}
        <Text style={styles.textActivity}>Activity *</Text>
        <DropdownPicker
          open={open}
          value={type} // the currently selected value (the type of activity)
          items={items} // the list of items to choose from
          setOpen={setOpen} // function to open/close the dropdown
          setValue={setType} // function to update the selected value
          placeholder="Select an Activity"
          style={styles.dropdown}
          labelStyle={styles.labelStyle}
        />

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
            onPressIn={handlePress}
            style={styles.textInput}
            value={formatDate(date) || ''} // display formatted date or empty if null (first go to this screen)
            // inputMode determines which keyboard to open, and has precedence over keyboardType.
            inputMode='none'
          />
          {
            showDatePicker && <DateTimePicker
              // DateTimePicker requires a valid date for its value prop at all times, but I want the picker not to show a date until the user has chosen one
              value={date || new Date()}
              mode='date'
              display='inline'
              onChange={onChangeDate}
            />
          }
        </View>

        {!showDatePicker && (
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
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screen,
  },
  view: {
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    marginBottom: 5,
    fontSize: fontSize.normalText,
    fontWeight: 'bold',
    color: Colors.addText,
  },
  textActivity: {
    marginTop: 50,
    marginBottom: 5,
    fontSize: fontSize.normalText,
    fontWeight: 'bold',
    color: Colors.addText,
    textAlign: 'left',
  },
  dropdown: {
    backgroundColor: Colors.dropdownBackground,
    marginBottom: 20,
  },
  labelStyle: {
    fontSize: fontSize.labelText,
    color: Colors.text,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.text,
    height: 50,
    padding: Padding.textInputPadding,
    fontSize: fontSize.normalText,
    color: Colors.text,
    backgroundColor: Colors.dropdownBackground,
  },
  dateContainer: {
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },

})