import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, fontSize, Padding } from '../Theme';
import { AntDesign } from '@expo/vector-icons';

/*
 * it renders the visual representation of an individual activity item, 
 * and receives an activity item as a prop and displays its details, such as type, date, and duration.
*/

export default function Activity({ item }) {


  // convert the Firestore timestamp to a JavaScript Date object
  function formatDate(timestamp) {
    const date = new Date(timestamp.seconds * 1000); // multiply by 1000 to convert seconds to milliseconds
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    const year = date.toLocaleString('en-US', { year: 'numeric' });
    return `${weekday} ${month} ${day} ${year}`;
  }


  // console.log(item.date) // date is a Firestore Timestamp

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
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <Text style={styles.durationText}>{item.duration} min</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  activityContainer: {
    marginBottom: 10,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: Padding.containerPadding,
    paddingBottom: Padding.containerPadding,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.itemBackground,
    borderRadius: 10,
  },
  typeText: {
    fontSize: fontSize.activityText,
    fontWeight: 'bold',
    color: Colors.itemName,
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
    fontSize: fontSize.activityText,
    fontWeight: 'bold',
    backgroundColor: Colors.itemTexBackground,
    padding: Padding.activityPadding,
    color: Colors.text,
    borderRadius: 5, // set the roundness for the text area
    overflow: 'hidden', // ensure the background doesn't spill outside the border radius
  },
  dateText: {
    fontSize: fontSize.activityText,
    fontWeight: 'bold',
    backgroundColor: Colors.itemTexBackground,
    padding: Padding.activityPadding,
    color: Colors.text,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 8,
  },
  icon: {
    padding: Padding.activityPadding,
    marginRight: 5,
  },
})