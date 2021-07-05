import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskDetails from '../screens/TaskDetails';
import TasksFeed from '../screens/TasksFeed';
import TasksByCategory from '../screens/TasksByCategory';
import TasksByStatus from '../screens/getTasksByStatus';

const Stack = createStackNavigator();

function TaskStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TasksFeed"
        options={{ headerTitle: 'Tasks Feed' }}
        component={TasksFeed}
      />
      <Stack.Screen
        name="TaskDetails"
        options={{ headerTitle: 'Task Details' }}
        component={TaskDetails}
      />
      <Stack.Screen
        name="TasksByCategory"
        options={{ headerTitle: 'Tasks By Category' }}
        component={TasksByCategory}
      />
      <Stack.Screen
        name="TasksByStatus"
        options={{ headerTitle: 'Tasks By Status' }}
        component={TasksByStatus}
      />
    </Stack.Navigator>
  );
}

export default TaskStackNavigator;
