import { API, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import TaskCard from '../components/molecules/TaskCard';
import { ScrollView } from 'react-native';
import { getTodosByCagtegory } from '../queries';
import { transformNumberToDate } from '../components/organism/TasksList';
import { todosDefaultState } from '../constants';

export default function TasksByCategory({ route, navigation }) {
  const { categoryName } = route.params;
  const [categoryTodos, setCategoryTodos] = useState(todosDefaultState);
  const [isLoading, setLoading] = useState(true);

  const getTasksByCategory = async () => {
    try {
      setLoading(true);
      const res = await API.graphql(
        graphqlOperation(getTodosByCagtegory(categoryName))
      );
      setLoading(false);
      setCategoryTodos(res.data.getTodosByCategory);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksByCategory();
  }, [categoryName]);

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
  ) : !categoryTodos.length ? (
    <Layout level="3" style={styles.outerContainer}>
      <Text style={styles.text}>No todos for this category</Text>
    </Layout>
  ) : (
    <Layout level="3" style={styles.outerContainer}>
      <ScrollView>
        <Layout level="3">
          <View style={styles.container}>
            <View style={styles.innerWrapper}>
              {categoryTodos.map((task, i) => {
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
                      marginBottom: i === categoryTodos.length - 1 ? 0 : 8,
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
  text: {
    marginTop: 16,
    alignSelf: 'center',
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 460,
  },
});
