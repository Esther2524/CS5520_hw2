import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Colors'

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
    button: {
        alignItems: 'center',
        margin: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})