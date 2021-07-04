import React from 'react';
import TasksList from '../components/organism/TasksList';
import { getTodos } from '../queries';

export default function TasksFeed({ navigation }) {
  return (
    <TasksList
      navigation={navigation}
      gqlQuery={getTodos}
      queryType="getTodos"
      type="allTasks"
    />
  );
}
