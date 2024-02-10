import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Colors, Padding } from '../Theme';
import StartScreen from '../screens/StartScreen';
import AddActivity from '../screens/AddActivity';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

// this file sets up the navigation structure, 
// creating a stack navigator that includes the start screen and a bottom tab navigator for the activity screens.
export default function StackNasvigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.headerBackground }, // global header style
            headerTintColor: Colors.header,
            headerTitleAlign: 'center', // center align the header title for Android
          }}>

          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Activities"
            component={TabNavigator}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="AddActivities"
            component={AddActivity}
            options={{ headerTitle: "Add Activity" }} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}
