import React from 'react';
import TasksList from '../components/organism/TasksList';

const getTodos = `
    query MyQuery {
      getDueTodos {
        categoryColor
        categoryName
        description
        dueAt
        id
        title
        status
      }
    }
  `;

export default function DueTasks({ navigation }) {
  return (
    <TasksList
      navigation={navigation}
      gqlQuery={getTodos}
      queryType="getDueTodos"
      type="dueTasks"
    />
  );
}
