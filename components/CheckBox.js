import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox';
import { Colors, fontSize, Padding } from '../Theme';

// run 'npx expo install expo-checkbox' to install checkbox
export default function CheckBox({ isSelected, onCheckboxPress, label }) {
  return (
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isSelected}
          onValueChange={onCheckboxPress}
          color={isSelected ? Colors.checkBox : undefined}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '91%',
  },
  checkboxContainer: {
    marginTop: Padding.checkBoxPadding,
    marginRight: 10,
    marginLeft: 10,
  },
  label: {
    fontSize: fontSize.checkBox,
    color: Colors.checkBoxLabel,
    fontWeight: 'bold',
  },
  textContainer: {
    padding: Padding.checkBoxPadding,
  },
})