import { StyleSheet, Text, View, TextInput, Platform, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import DropdownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, fontSize, Padding } from '../Theme';
import { db } from '../configuration/FirebaseConfig';
import { collection, addDoc, updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import PressableButton from '../components/PressableButton';
import CheckBox from '../components/CheckBox';

const items = [
  { label: 'Walking', value: 'Walking' },
  { label: 'Running', value: 'Running' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Weights', value: 'Weights' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Hiking', value: 'Hiking' }
];


export default function AddActivity({ activityData, navigation, isFromEdit, itemID }) {

  // open is a boolean state that controls whether the dropdown is open or closed.
  const [open, setOpen] = useState(false);
  // set date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // for Adding: the attributes of an activity
  const [type, setType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);

  // for Editing: populate data from this specific item
  const [isSelect, setIsSelect] = useState(false);


  // console.log("Data Passed to Edit Screen:", activityData);
  // console.log("is from edit screen?", isFromEdit);


  useEffect(() => {
    if (isFromEdit && activityData) {
      populateData();
    }
  }, [isFromEdit, activityData]); // depend on isFromEdit and activityData


  // for Editing a existing activity
  function populateData() {
    setType(activityData.type);
    setDuration(activityData.duration.toString());
    setDate(new Date(activityData.date.seconds * 1000)); // convert timestamp to normal date format
  };

  // For Adding a new activity
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


  /* 
   * why use async and await here: 
   * network requests take time, if we haven't written our data to the Firestore database, 
   * we shouldn't go back to the previous Screen. 
   * 
   * another way to write: const handleAddActivity = async () => {...}
  */
  async function handleAddActivity() {
    if (!validateInput(type, duration, date)) return;
    const isSpecial = (type === 'Running' || type === 'Weights') && parseInt(duration, 10) > 60;

    try {
      const docRef = await addDoc(collection(db, "Activities"), {
        type,
        duration: parseInt(duration, 10),
        date: date,
        // we don't need to manually generate unique IDs here. Firebase will automatically geneate unique IDs
        isSpecial,
        // add a server-side timestamp for display activities based on creation time later on
        // createdAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id); // access the auto-generated ID by Firestore
      navigation.goBack(); // go back to previous screen
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };



  function handleEditActivity() {
    if (!validateInput(type, duration, date)) return;

    Alert.alert(
      "Important",
      "Are you sure you want to save these changes?",
      [
        { text: "No" },
        { text: "Yes", onPress: () => editActivity() }
      ]
    );
  }


  async function editActivity() {
    // console.log("edit data with id", itemID);

    // determine the new value of isSpecial based on the original value and isSelect
    let newIsSpecial = (type === 'Running' || type === 'Weights') && parseInt(duration, 10) > 60;;
    if (activityData.isSpecial && isSelect) {
      newIsSpecial = false;
    }

    try {
      // create a reference to the document with this itemID
      const activityRef = doc(db, "Activities", itemID);

      await updateDoc(activityRef, {
        type,
        duration: parseInt(duration, 10),
        date: date,
        isSpecial: newIsSpecial,
      });
      console.log("Activity updated with ID: ", itemID);
      navigation.goBack(); // go back to the previous screen after editing the current activity
    } catch (error) {
      console.error("Error updating document: ", error);
      Alert.alert("Error", "Could not update the activity");
    }

  }



  // return to the previous screen
  function handleCancel() {
    navigation.goBack();
  };



  /*
   * user interaction flow for date picker:
   * when the user clicks the input field (triggering handlePress), showDatePicker becomes true, displaying the picker.
   * Once the user selects a date, onChangeDate updates date and sets showDatePicker to false, hiding the picker.
   * 
   * but if the user clicks the same date, the picker won't disappear. to close it, they have to click the input field again.
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


  /* 
   * hide the picker after selection:
   * date pickers do not consider selecting the same date as a change event, 
   * thus not triggering the onChange or equivalent event handler 
   * if the date hasn't changed from its previous value.
  */
  function onChangeDate(event, selectedDate) {
    setShowDatePicker(false); // hide DateTimePicker after selection (only work out when the user chooses a different date)
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
      {/* we can't use this here: {isFromEdit && populateData()}  */}
      <View style={styles.view}>
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
            // !! inputMode determines which keyboard to open, and has precedence over keyboardType.
            inputMode='none'
          />
          {
            showDatePicker && <DateTimePicker
              // DateTimePicker requires a valid date for its value prop at all times, 
              // but I want the picker not to show a date until the user has chosen one
              value={date || new Date()}
              mode='date'
              display='inline'
              onChange={onChangeDate}
            />
          }
        </View>

        <View style={styles.bottomView}>

          <View style={styles.chechboxContainer}>
            {/* I need to check if activityData is null or undefined
              because null.isSpecial will cause errors */}
            {
              isFromEdit && activityData && activityData.isSpecial && !showDatePicker &&
              (<CheckBox
                isSelected={isSelect}
                onCheckboxPress={() => { setIsSelect(!isSelect) }}
                label='This item is marked as special. Select the checkbox if you would like to unmark it as special.'
              />)
            }

          </View>



          {!showDatePicker && (
            <View style={styles.buttonContainer}>

              <PressableButton
                onPress={handleCancel}
                customStyle={styles.cancelButton}
              >
                <Text style={styles.buttonTitle}>Cancel</Text>
              </PressableButton>


              <PressableButton
                onPress={isFromEdit ? handleEditActivity : handleAddActivity}
                customStyle={styles.saveButton}
              >
                <Text style={styles.buttonTitle}>Save</Text>
              </PressableButton>

            </View>
          )}

        </View>



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
    marginBottom: 200,
  },
  bottomView: {
    marginTop: 100,
  },
  chechboxContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginTop: 200,
  },
  cancelButton: {
    backgroundColor: Colors.cancelButton,
    paddingVertical: 10,
    width: '40%',
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Colors.saveButton,
    paddingVertical: 10,
    width: '40%',
    borderRadius: 13,
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: fontSize.buttonText,
    color: Colors.buttonTitle,
    fontWeight: 'bold',
  },

})