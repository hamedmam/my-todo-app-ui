/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import useColorScheme from '../hooks/useColorScheme';
import Categories from '../screens/Categories';
import TaskCreation from '../screens/TaskCreation';
import DueTasks from '../screens/DueTasks';

import {
  BottomTabParamList,
  TabFourParamList,
  TabOneParamList,
  TabThreeParamList,
  TabTwoParamList,
} from '../types';
import TaskStackNavigator from './TaskStackNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Tasks"
      tabBarOptions={{
        tabStyle: {
          backgroundColor: '#101426',
        },
        labelPosition: 'below-icon',
        activeTintColor: 'white',
      }}
    >
      <BottomTab.Screen
        name="Tasks"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="format-list-bulleted" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="DueTasks"
        component={TabTwoNavigator}
        options={{
          title: 'Due Tasks',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="timelapse" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="category" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AddTask"
        component={TabFourNavigator}
        options={{
          title: 'Add Task',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="add-task" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TasksFeed"
        component={TaskStackNavigator}
        options={{ headerTitle: 'Tasks' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={DueTasks}
        options={{ headerTitle: 'Due Tasks' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThree = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThree.Navigator>
      <TabThree.Screen
        name="Categories"
        component={Categories}
        options={{ headerTitle: 'Categories' }}
      />
    </TabThree.Navigator>
  );
}

const TabFour = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFour.Navigator>
      <TabFour.Screen
        name="TaskCreation"
        component={TaskCreation}
        options={{ headerTitle: 'Create Task' }}
      />
    </TabFour.Navigator>
  );
}
