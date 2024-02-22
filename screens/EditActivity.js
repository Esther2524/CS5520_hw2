import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddActivity from './AddActivity';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../configuration/FirebaseConfig';

export default function EditActivity({ route, navigation }) {

  const { itemID } = route.params;

  const [activityData, setActivityData] = useState(null);

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

  return (
    <AddActivity 
    activityData={activityData} 
    navigation={navigation} 
    isFromEdit={true}
    itemID={itemID}/>
  )
}

const styles = StyleSheet.create({})