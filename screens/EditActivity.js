import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddActivity from './AddActivity';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../configuration/FirebaseConfig';
import PressableButton from '../components/PressableButton';
import { AntDesign } from '@expo/vector-icons';
import { Colors, fontSize, Padding } from '../Theme';


export default function EditActivity({ route, navigation }) {

  // extract itemID from navigation params to identify the activity to be edited
  const { itemID } = route.params;

  const [activityData, setActivityData] = useState(null);

  // fetch activity data on component mount or when itemID changes
  useEffect(() => {

    async function fetchActivity() {
      const docRef = doc(db, 'Activities', itemID);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setActivityData(docSnap.data());
        } else {
          console.log("No such document!"); // handle the case where the document does not exist
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    fetchActivity();
  }, [itemID]);


  function handleDelete() {
    Alert.alert(
      "Delete", // title
      "Are you sure you want to delete this activity?", // message
      // button (array)
      [
        { text: "No" },
        // note that, it is NOT `() => {deleteActivity}`
        { text: "Yes", onPress: () => deleteActivity() } // button to confirm deletion
      ]
    );
  }



  async function deleteActivity() {
    try {
      await deleteDoc(doc(db, 'Activities', itemID));
      console.log("Deleted document with ID", itemID);
      navigation.goBack(); // navigate back to the previous screen
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            onPress={handleDelete}
            customStyle={{ marginRight: 20, }}
          >
            <AntDesign name="delete" size={22} color={Colors.deleteButton} />
          </PressableButton>
        )
      }
    })
  }, [navigation, itemID]);




  return (
    <AddActivity
      activityData={activityData}
      navigation={navigation}
      isFromEdit={true}
      itemID={itemID} />
  )
}

const styles = StyleSheet.create({})