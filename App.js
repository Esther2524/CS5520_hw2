import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import StartScreen from './screens/StartScreen';
import AddActivity from './screens/AddActivity';
import AllActivities from './screens/AllActivities';
import SpecialActivities from './screens/SpecialActivities';
import ActivitiesProvider from './context/ActivitiesProvider';
import { NavigationContainer } from '@react-navigation/native';
import Colors from './Colors';
// App.js will set up the navigation structure, 
// creating a stack navigator that includes the start screen and a bottom tab navigator for the activity screens.

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ActivityTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.header }, // Set the background color for all headers
        headerTintColor: Colors.headerBackground, // Optional: Set the color of the header title and icons
      }}
    >
      <Tab.Screen
        name="AllActivities"
        component={AllActivities}
        options={{ headerTitle: "All Activities" }} />

      <Tab.Screen
        name="SpecialActivities"
        component={SpecialActivities}
        options={{ headerTitle: "All Activities" }} />

    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <ActivitiesProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.headerBackground }, // Global header style
            headerTintColor: Colors.header,
          }}>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Activities"
            component={ActivityTab}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="AddActivities"
            component={AddActivity}
            options={{ headerTitle: "Add Activity" }} />

        </Stack.Navigator>
      </NavigationContainer>

    </ActivitiesProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
