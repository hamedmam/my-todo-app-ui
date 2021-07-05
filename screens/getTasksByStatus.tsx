import { API, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import TaskCard from '../components/molecules/TaskCard';
import { ScrollView } from 'react-native';
import { getTodosByStatus } from '../queries';
import { todosDefaultState } from '../constants';
import { transformNumberToDate } from '../components/organism/TasksList';

export default function TasksByStatus({ route, navigation }) {
  const { status } = route.params;
  const [statusTodos, setStatusTodos] = useState(todosDefaultState);
  const [isLoading, setLoading] = useState(true);

  const getTasksByStatus = async () => {
    try {
      setLoading(true);
      const res = await API.graphql(graphqlOperation(getTodosByStatus(status)));
      setLoading(false);
      setStatusTodos(res.data.getTodosByStatus);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksByStatus();
  }, [status]);

  return isLoading ? (
    <Layout
      level="3"
      style={[
        styles.outerContainer,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Spinner size="giant" />
    </Layout>
  ) : !statusTodos.length ? (
    <Layout level="3" style={styles.outerContainer}>
      <Text style={{ marginTop: 16, alignSelf: 'center' }}>
        No todos for this category
      </Text>
    </Layout>
  ) : (
    <Layout level="3" style={styles.outerContainer}>
      <ScrollView>
        <Layout level="3">
          <View style={styles.container}>
            <View style={styles.innerWrapper}>
              {statusTodos.map((task, i) => {
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
                      marginBottom: i === statusTodos.length - 1 ? 0 : 8,
                    }}
                    type="allTasks"
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
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    padding: 8,
    alignItems: 'center',
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 460,
  },
});
