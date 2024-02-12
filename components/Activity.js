import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, fontSize, Padding } from '../Theme';
import { AntDesign } from '@expo/vector-icons';

export default function Activity({ item }) {
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