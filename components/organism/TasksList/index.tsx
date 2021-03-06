import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import TaskCard, { TaskListType } from '../../molecules/TaskCard';
import { DataContext } from '../../../providers/DataProvider';

export const transformNumberToDate = (dueAt: number) => {
  const due = new Date();
  const strDueAt = dueAt.toString();
  const year = strDueAt.slice(0, 4);
  const month = strDueAt.slice(4, 6);
  const day = strDueAt.slice(6, 8);
  due.setMonth(Number(month));
  due.setDate(Number(day));
  due.setFullYear(Number(year));
  return due;
};

type TaskList = {
  queryType: string;
  navigation: any;
  gqlQuery: string;
  type: TaskListType;
};

const TasksList = ({ queryType, navigation, gqlQuery, type }: TaskList) => {
  const [isLoading, setLoading] = useState(true);
  const { tasks, dueTasks, setTasks, setDueTasks } = useContext(DataContext);
  const getTasks = async () => {
    try {
      setLoading(true);
      const res = await API.graphql(graphqlOperation(gqlQuery));
      setLoading(false);
      if (type === 'allTasks') {
        setTasks(res.data[queryType]);
      }
      if (type === 'dueTasks') {
        setDueTasks(res.data[queryType]);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const renderingTasks = type === 'allTasks' ? tasks : dueTasks;

  return isLoading ? (
    <Layout
      level="3"
      style={[styles.outerContainer, styles.loadingOuterContainer]}
    >
      <Spinner size="giant" />
    </Layout>
  ) : !renderingTasks.length ? (
    <Layout level="3" style={styles.outerContainer}>
      <Text style={styles.text}>
        {type === 'dueTasks'
          ? 'nothing is due for today'
          : 'You are all set, nothing to do :)'}
      </Text>
    </Layout>
  ) : (
    <Layout level="3" style={styles.outerContainer}>
      <ScrollView>
        <Layout level="3">
          <View style={styles.container}>
            <View style={styles.innerWrapper}>
              {renderingTasks.map((task, i) => {
                const due = transformNumberToDate(task.dueAt);
                return (
                  <TaskCard
                    onPress={() =>
                      navigation.navigate('TaskDetails', {
                        id: task.id,
                      })
                    }
                    key={task.id}
                    style={{
                      marginBottom: i === renderingTasks.length - 1 ? 0 : 8,
                    }}
                    type={type}
                    taskProps={{ ...task, dueAt: due.toDateString() }}
                  />
                );
              })}
            </View>
          </View>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
export default TasksList;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  loadingOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 8,
    alignItems: 'center',
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 460,
  },
  text: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
