import React from 'react';
import TasksList from '../components/organism/TasksList';

const getTodos = `
  query MyQuery {
    getTodos {
      description
      id
      title
      dueAt
      categoryName
      categoryColor
    }
  }
`;

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
