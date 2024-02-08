import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { ActivitiesContext } from '../context/ActivitiesProvider';
import { useContext } from 'react';

export default function ActivitiesList({ showSpecialOnly }) {

  const { activities } = useContext(ActivitiesContext);

  function renderActivity({ item }) {
    <View>
      <Text>{item.type}</Text>
      <Text>{item.duration}</Text>
      <Text>{item.date}</Text>
    </View>
  };

  const filtedActivities = showSpecialOnly ?
    activities.filter(
      activity => (activity.type === 'Running' || activity.type === 'Weight Training') && activity.duration > 60
    ) : activities;

  return (
    <FlatList
      data={filtedActivities}
      renderItem={renderActivity}
      keyExtractor={item => item.id}
    />
  )
}

const styles = StyleSheet.create({})