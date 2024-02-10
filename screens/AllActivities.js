import { StyleSheet, View } from 'react-native'
import React from 'react'
import ActivitiesList from '../components/ActivitiesList'
import { Colors } from '../Theme';

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