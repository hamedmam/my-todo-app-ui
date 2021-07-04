import React from 'react';
import TasksList from '../components/organism/TasksList';
import { getDueTodos } from '../queries';

export default function DueTasks({ navigation }) {
  return (
    <TasksList
      navigation={navigation}
      gqlQuery={getDueTodos}
      queryType="getDueTodos"
      type="dueTasks"
    />
  );
}
