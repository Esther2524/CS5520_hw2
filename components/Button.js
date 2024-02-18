import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, fontSize } from '../Theme';

export default function Button({ onPress, title, disabled, textColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      disabled={disabled}
    >
      <Text
        style={[styles.text, { color: disabled ? Colors.disabledButton : textColor }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.buttonText,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginRight: 10,
  }
})