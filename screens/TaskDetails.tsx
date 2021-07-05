import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Layout,
  Text,
  Button,
  Input,
  Datepicker,
  CheckBox,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { transformNumberToDate } from '../components/organism/TasksList';
import Category from '../components/atoms/Category';
import { transformDateToNumber } from './TaskCreation';
import { useContext } from 'react';
import { DataContext, Status } from '../providers/DataProvider';
import { getTodo, updateTodoById } from '../queries';
import { todoDefaultState } from '../constants';

const TaskDetails = ({ route }: { route: any }) => {
  const { tasks, setTasks } = useContext(DataContext);
  const [task, setTask] = useState(todoDefaultState);
  const [isEditMode, setEditMode] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { id } = route.params;

  const { title, description, dueAt, status, categoryName, categoryColor } =
    task;

  const updateTodo = async () => {
    try {
      setLoading(true);
      const res = await API.graphql(
        graphqlOperation(
          updateTodoById({ status, id, title, description, dueAt })
        )
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
      const res = await API.graphql(graphqlOperation(getTodo(id)));
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

  useEffect(() => {
    setIsDone(task.status === Status.done);
  }, [task.status]);

  const parsedDate = transformNumberToDate(task.dueAt);

  return isLoading ? (
    <Layout style={styles.outerContainer} level="3" />
  ) : (
    <Layout level="3" style={styles.outerContainer}>
      <Layout level="3" style={styles.container}>
        <Layout level="1" style={styles.innerWrapper}>
          <Layout
            style={{ backgroundColor: 'transparent', flexDirection: 'row' }}
          >
            <Text style={styles.title} category="h6">
              {title}
            </Text>
            <View style={styles.dateWrapper}>
              <Text style={styles.text} category="c1">
                <Text category="c2">Due at:</Text> {parsedDate.toDateString()}
              </Text>
            </View>
          </Layout>
          <Text style={styles.section} category="s1">
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
            <View style={styles.editSectionWrapper}>
              <Text style={styles.text} category="label">
                update title
              </Text>
              <Input
                style={styles.section}
                value={task.title}
                onChangeText={(title) => setTask({ ...task, title })}
              />
              <Text style={styles.text} category="label">
                update description
              </Text>
              <Input
                style={styles.section}
                value={description}
                onChangeText={(description) =>
                  setTask({ ...task, description })
                }
              />
              <Text style={styles.text} category="label">
                update status
              </Text>
              <CheckBox
                style={styles.section}
                checked={isDone}
                onChange={(nextChecked) => {
                  setIsDone(nextChecked);
                  setTask({
                    ...task,
                    status: nextChecked ? Status.done : Status.todo,
                  });
                }}
              >
                Done
              </CheckBox>
              <Text style={styles.text} category="label">
                update date
              </Text>
              <Datepicker
                style={styles.section}
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
  dateWrapper: {
    flex: 2,
    marginLeft: 'auto',
  },
  section: {
    marginBottom: 16,
  },
  title: {
    flex: 8,
    marginBottom: 8,
  },
  text: {
    marginBottom: 4,
  },
  editSectionWrapper: {
    marginTop: 32,
  },
});
