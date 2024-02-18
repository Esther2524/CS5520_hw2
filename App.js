import { StyleSheet } from 'react-native';
import StackNavigator from './navigation/StackNavigator';

/*
 * Main entry point of the React Native application.

 * App.js wraps the entire app in the ActivitiesProvider from the context API,
 * providing global state management for activities data throughout the app.
 * 
 * It includes the StackNavigator component for handling the navigation logic.
*/
export default function App() {

  return (
      <StackNavigator />
  );
}

const styles = StyleSheet.create({})