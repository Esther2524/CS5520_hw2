import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { ActivitiesContext } from '../context/ActivitiesProvider';
import { useContext } from 'react';
import { Colors } from '../Theme';
import { AntDesign } from '@expo/vector-icons';

export default function ActivitiesList({ showSpecialOnly }) {

  const { activities } = useContext(ActivitiesContext);

  console.log(activities);


  function renderActivity({ item }) {
    return (
      <View style={styles.activityContainer}>
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        <View style={styles.iconAndTextContainer}>
        {item.isSpecial ? (
          <AntDesign style={styles.icon} name={'star'} size={22} color={Colors.activeTab} />
        ) : (
          // placeholder view when there is no icon
          <View style={[styles.icon, { width: 22, height: 22 }]} />
        )}
          <View style={styles.textContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.durationText}>{item.duration} min</Text>
          </View>
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
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.itemBackground,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
    marginRight: 5,
  },
  typeContainer: {
    marginLeft: 5,
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    marginRight: 8,
  },
  icon: {
    padding: 5,
    marginRight: 5,
  }

})