import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskDetails from '../screens/TaskDetails';
import TasksFeed from '../screens/TasksFeed';
import TasksByCategory from '../screens/TasksByCategory';

const Stack = createStackNavigator();

function TaskStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TasksFeed" component={TasksFeed} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="TasksByCategory" component={TasksByCategory} />
    </Stack.Navigator>
  );
}

export default TaskStackNavigator;
