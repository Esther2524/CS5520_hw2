import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Colors, Padding } from '../Theme';
import StartScreen from '../screens/StartScreen';
import AddActivity from '../screens/AddActivity';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import EditActivity from '../screens/EditActivity';

/*
 * this file define a stack of screens for the app's navigation,
 * including (1) the StartScreen, (2) a TabNavigator for navigating between activity screens,
 *  and (3) an AddActivity screen for adding new activities.
*/

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.headerBackground }, // global header style
          headerTintColor: Colors.header,
          // headerTitleAlign: 'center', // center align the header title for Android
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
          options={{
            headerTitle: "Add Activity",
            headerBackTitleVisible: false, // remove the text label next to the back button on iOS
          }} />

        <Stack.Screen
          name="EditActivity"
          component={EditActivity}
          options={{
            headerTitle: "Edit",
            headerBackTitleVisible: false, // remove the text label next to the back button on iOS
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})