import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import AllActivities from '../screens/AllActivities';
import SpecialActivities from '../screens/SpecialActivities';
import { Colors } from '../Theme';
import PressableButton from '../components/PressableButton';

/*
 * this file manages the bottom tab navigation of the app
 * between different screens within the app (AllActivities and SpecialActivities)
*/

// set up the tab navigator
const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  /* a function for configuring screen options
   * each screen in the navigator stack or tab navigator has a route object 
   * that includes details like the name of the route and parameters passed to it.
  */
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'AllActivities') {
        iconName = focused ? 'appstore1' : 'appstore-o';
      } else if (route.name === 'SpecialActivities') {
        iconName = focused ? 'star' : 'staro';
      }
      return <AntDesign name={iconName} size={size} color={color} />;
    },

    tabBarLabelPosition: 'below-icon', // put the label below the icon
    // visually represent tabs with active and inactive
    tabBarActiveTintColor: Colors.activeTab,
    tabBarInactiveTintColor: Colors.inactiveTab,
    tabBarStyle: { backgroundColor: Colors.headerBackground },

    headerStyle: { backgroundColor: Colors.headerBackground }, // set the background color for all headers
    headerTintColor: Colors.header,
    headerTitleAlign: 'center', // center align the header title for Android

    // add a universal headerRight button for both tabs
    headerRight: () => (
      <PressableButton
        // I do not need to explicitly pass { activityData: null }. 
        // If I don't provide the activityData parameter, it will be undefined by default in the route.params of the AddActivity component. 
        onPress={() => navigation.navigate('AddActivities')}
        customStyle={{ marginRight: 20, }}
      >
        <AntDesign name="plus" size={24} color={Colors.addButton} />
      </PressableButton>
    ),
  });

  return (
    <Tab.Navigator screenOptions={screenOptions} >

      <Tab.Screen
        name="AllActivities"
        component={AllActivities}
        options={{ headerTitle: 'All Activities', tabBarLabel: 'All Activities' }} />

      <Tab.Screen
        name="SpecialActivities"
        component={SpecialActivities}
        options={{ headerTitle: 'Special Activities', tabBarLabel: 'Special Activities' }} />

    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({})