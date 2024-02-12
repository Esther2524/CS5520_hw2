import { StyleSheet, View } from 'react-native'
import React from 'react'
import ActivitiesList from '../components/ActivitiesList'
import { Colors } from '../Theme';

/*
 * this file serves as a screen to display all activities within the app,
 * rendering the ActivitiesList with a prop `showSpecialOnly` set to false, 
 * indicating that the list should include all activities,
 * not just those marked as special.
*/

export default function AllActivities() {
  return (
    <View style={styles.container}>
      <ActivitiesList showSpecialOnly={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screen,
  }
})