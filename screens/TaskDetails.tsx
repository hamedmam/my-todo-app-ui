import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Layout, Text, Button, Input, Datepicker } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { transformNumberToDate } from '../components/organism/TasksList';
import Category from '../components/atoms/Category';
import { transformDateToNumber } from './TaskCreation';
import { useContext } from 'react';
import { DataContext } from '../providers/DataProvider';

const TaskDetails = ({ route }) => {
  const { tasks, setTasks } = useContext(DataContext);
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    dueAt: 20210101,
    categoryName: '',
    categoryColor: '',
  });
  const [isEditMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { id } = route.params;

  const getTodo = `
    query MyQuery {
      getTodo(id: "${id}") {
        description
        id
        title
        dueAt
        categoryName
        categoryColor
      }
    }
  `;

  const updateTodoById = ({
    id,
    title,
    description,
    dueAt,
  }: {
    id: string;
    title: string;
    description: string;
    dueAt: number;
  }) => `
    mutation MyMutation {
      updateTodo(description: "${description}", dueAt: ${dueAt}, id: "${id}", title: "${title}") {
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

  const { title, description, dueAt, categoryName, categoryColor } = task;

  const updateTodo = async () => {
    try {
      setLoading(true);
      const res = await API.graphql(
        graphqlOperation(updateTodoById({ id, title, description, dueAt }))
      );
      const updateTaskIndex = tasks.findIndex((task) => task.id === id);
      const clonedTasks = [...tasks];
      clonedTasks[updateTaskIndex] = task;
      setTasks(clonedTasks);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getTask = async () => {
    try {
      setLoading(true);
      const res = await API.graphql(graphqlOperation(getTodo));
      setTask(res.data.getTodo);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getTask();
  }, [id]);

  const parsedDate = transformNumberToDate(task.dueAt);

  return isLoading ? (
    <Layout level="3" />
  ) : (
    <Layout level="3" style={styles.outerContainer}>
      <Layout level="3" style={styles.container}>
        <Layout level="1" style={styles.innerWrapper}>
          <Layout
            style={{ backgroundColor: 'transparent', flexDirection: 'row' }}
          >
            <Text style={{ flex: 8, marginBottom: 8 }} category="h6">
              {title}
            </Text>
            <Layout level="1" style={{ flex: 2, marginLeft: 'auto' }}>
              <Text style={{ marginBottom: 4 }} category="c1">
                <Text category="c2">Due at:</Text> {parsedDate.toDateString()}
              </Text>
            </Layout>
          </Layout>
          <Text style={{ marginBottom: 16 }} category="s1">
            {description}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Category color={categoryColor} name={categoryName} />
            <Button
              onPress={() => setEditMode(true)}
              style={{ marginLeft: 'auto' }}
              status="success"
              size="tiny"
            >
              edit
            </Button>
          </View>
          {isEditMode && (
            <View style={{ marginTop: 32 }}>
              <Text style={{ marginBottom: 4 }} category="label">
                update title
              </Text>
              <Input
                style={{ marginBottom: 16 }}
                value={task.title}
                onChangeText={(title) => setTask({ ...task, title })}
              />
              <Text style={{ marginBottom: 4 }} category="label">
                update description
              </Text>
              <Input
                style={{ marginBottom: 16 }}
                value={description}
                onChangeText={(description) =>
                  setTask({ ...task, description })
                }
              />
              <Text style={{ marginBottom: 4 }} category="label">
                update date
              </Text>
              <Datepicker
                style={{ marginBottom: 16 }}
                date={parsedDate}
                onSelect={(value) => {
                  const date = transformDateToNumber(value);
                  setTask({
                    ...task,
                    dueAt: date,
                  });
                }}
              />
              <Button onPress={() => updateTodo()}>Submit</Button>
            </View>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    padding: 8,
    alignItems: 'center',
  },
  innerWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
    maxWidth: 460,
  },
});
