import React, { createContext, useState } from 'react';

// ActivitiesContext is a constant that is available to be imported in other files or modules
export const ActivitiesContext = createContext();


// This component initializes an empty array for activities and provides two functions to manipulate this array: 
// one for adding new activities and another for setting activities
export default function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([]);

  // addActivity is a function that takes a new activity object and adds it to the current list of activities. 
  function addActivity(activity) {
    setActivities(currentActivities => [...currentActivities, activity]);
  }

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities, addActivity }}>
      {children}
    </ActivitiesContext.Provider>
  )
}


// Note:
// any function (or value) that I include in the value of the ActivitiesContext.Provider 
// within the ActivitiesProvider component can be accessed by 
// any of the App component's child components, 
// assuming I have wrapped the entire application (or the relevant part of it) with the ActivitiesProvider. 

