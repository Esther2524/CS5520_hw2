import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Activity from './Activity';
import { db } from '../configuration/FirebaseConfig';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

/*
 * this file fetches data from Firestore database, and renders a list of activities within the app
 * it optionally filter activities to show only special ones based on the `showSpecialOnly` prop.
 * 
*/

export default function ActivitiesList({ showSpecialOnly }) {

  const [activities, setActivities] = useState([]);

  // When (1) the component ActivitiesList mounts or (2) navigating from AllActivities to SpecialActivities or vice versa,
  // useEffect is called or re-run
  useEffect(() => {
    let q; // q represents a query object 
    if (showSpecialOnly) {
      // Firestore is unable to both filter by isSpecial and order by date without index
      q = query(collection(db, "Activities"), where("isSpecial", "==", true));
    } else {
      q = query(collection(db, "Activities"));
    }
    // console.log(q);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const activitiesArray = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      // since 'date' is stored as a Timestamp object in Firestore, we can sort in ascending order
      .sort((a, b) => a.date.seconds - b.date.seconds);
      setActivities(activitiesArray);
    });

    // stop listening to updates when the component unmounts or before the effect re-runs
    return () => unsubscribe(); 
  }, [showSpecialOnly]);


  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={({ item }) => <Activity item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
})