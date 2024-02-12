import { StyleSheet, View } from 'react-native';
import React from 'react';
import ActivitiesList from '../components/ActivitiesList';
import { Colors } from '../Theme';

/*
 * this file serves as a screen to display special activities within the app,
 * rendering the ActivitiesList with a prop `showSpecialOnly` set to true, 
 * indicating that the list should only include all activities marked as special.
*/

export default function SpecialActivities() {
  return (
    <View style={styles.container}>
      <ActivitiesList showSpecialOnly={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screen,
  }
})