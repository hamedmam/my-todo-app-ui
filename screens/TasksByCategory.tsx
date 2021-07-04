import { API, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import TaskCard from '../components/molecules/TaskCard';
import { ScrollView } from 'react-native';
import { getTodosByCagtegory } from '../queries';

export default function TasksByCategory({ route, navigation }) {
  const { categoryName } = route.params;
  const [categoryTodos, setCategoryTodos] = useState([]);
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
              {categoryTodos.map(
                (
                  {
                    id,
                    title,
                    description,
                    dueAt,
                    categoryName,
                    categoryColor,
                  },
                  i
                ) => {
                  const due = new Date();
                  const strDueAt = dueAt.toString();
                  const year = strDueAt.slice(0, 4);
                  const month = strDueAt.slice(4, 6);
                  const day = strDueAt.slice(6, 8);
                  due.setMonth(Number(month));
                  due.setDate(Number(day));
                  due.setFullYear(Number(year));
                  return (
                    <TaskCard
                      onPress={() =>
                        navigation.navigate('TaskDetails', {
                          id,
                        })
                      }
                      key={id}
                      style={{
                        marginBottom: i === categoryTodos.length - 1 ? 0 : 8,
                      }}
                      type="allTasks"
                      title={title}
                      id={id}
                      description={description}
                      dueAt={due.toDateString()}
                      category={{
                        name: categoryName,
                        color: categoryColor,
                      }}
                    />
                  );
                }
              )}
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
