import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { ActivitiesContext } from '../context/ActivitiesProvider';
import { useContext } from 'react';
import Activity from './Activity';

export default function ActivitiesList({ showSpecialOnly }) {

  const { activities } = useContext(ActivitiesContext);

  console.log(activities);

  // Filter activities based on the `showSpecialOnly` prop and `isSpecial` attribute
  const filteredActivities = showSpecialOnly
    ? activities.filter(activity => activity.isSpecial)
    : activities;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredActivities}
        renderItem={({ item }) => <Activity item={item}/>}
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