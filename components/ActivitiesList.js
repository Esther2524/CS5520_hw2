import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { ActivitiesContext } from '../context/ActivitiesProvider';
import { useContext } from 'react';
import Colors from '../Colors';
import { AntDesign } from '@expo/vector-icons';

export default function ActivitiesList({ showSpecialOnly }) {

  const { activities } = useContext(ActivitiesContext);

  console.log(activities);


  function renderActivity({ item }) {
    return (
      <View style={styles.activityContainer}>
        <Text style={styles.typeText}>{item.type}</Text>
        {item.isSpecial && <AntDesign style={styles.icon} name={'star'} size={20} color={Colors.activeTab} />}
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.durationText}>{item.duration} min</Text>
        </View>
      </View>
    )
  };

  // Filter activities based on the `showSpecialOnly` prop and `isSpecial` attribute
  const filteredActivities = showSpecialOnly
    ? activities.filter(activity => activity.isSpecial)
    : activities;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scrollView}
        data={filteredActivities}
        renderItem={renderActivity}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  scrollView: {

  },
  activityContainer: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.itemBackground,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    color: 'white',
  },
  textContainer: {

  },
  durationText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: Colors.itemTexBackground,
    padding: 5,
    color: Colors.text,
    borderRadius: 5, // set the roundness for the text area
    overflow: 'hidden', // ensure the background doesn't spill outside the border radius
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: Colors.itemTexBackground,
    padding: 5,
    color: Colors.text,
    borderRadius: 5,
    overflow: 'hidden',
  },
  icon: {
    padding: 5,
  }

})