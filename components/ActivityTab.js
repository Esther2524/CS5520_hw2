import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import AllActivities from '../screens/AllActivities';
import SpecialActivities from '../screens/SpecialActivities';
import Colors from '../Colors';
import Button from './Button';

const Tab = createBottomTabNavigator();

export default function ActivityTab({ navigation }) {
  // a function for configuring screen options
  // each screen in the navigator stack or tab navigator has a route object 
  // that includes details like the name of the route and parameters passed to it.
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
    tabBarActiveTintColor: Colors.activeTab,
    tabBarInactiveTintColor: Colors.inactiveTab,
    tabBarStyle: { backgroundColor: Colors.headerBackground },

    headerStyle: { backgroundColor: Colors.headerBackground }, // Set the background color for all headers
    headerTintColor: Colors.header,

    // add a universal headerRight button for both tabs
    // ensure all activities added from the "Special Activities" screen are marked as special
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('AddActivities',
         {isSpecial: route.name === 'SpecialActivities',}
        )} // the second argument is 'params', which allows us to pass additional data to the screen we're navigating to
        title="Add"
        disabled={false}
        textColor={Colors.addButton}
      />
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