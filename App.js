import ActivitiesProvider from './context/ActivitiesProvider';
import StackNavigator from './navigation/StackNavigator';
// App.js will set up the navigation structure, 
// creating a stack navigator that includes the start screen and a bottom tab navigator for the activity screens.

// the navigation logic is now encapsulated within the StackNavigator 

export default function App() {

  return (
    <ActivitiesProvider>
      <StackNavigator />
    </ActivitiesProvider>
  );
}
