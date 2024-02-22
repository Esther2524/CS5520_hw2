import { Pressable, StyleSheet } from "react-native";
import React from "react";

// Using children allows us to pass any React element (e.g., text, icons) 
// to the button, making the component more versatile. 
export default function PressableButton({ onPress, customStyle, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.defaultStyle,
        customStyle,
        // if pressed
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    // alignItems: 'center',
  },
  pressed: {
    // an opacity value of 0.5 reduces the visibility of the component to half, making it semi-transparent
    opacity: 0.5,
  },
})