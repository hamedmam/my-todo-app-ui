import React from 'react';
import { Card, Text, Layout, Button } from '@ui-kitten/components';
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import Category from '../../atoms/Category';
import Status from '../../atoms/Status';
import { useContext } from 'react';
import { DataContext, Tasks } from '../../../providers/DataProvider';

export type TaskListType = 'dueTasks' | 'allTasks';

const isDueTask = (dueTasks: Tasks, id: string) =>
  dueTasks.find((task) => task.id === id);

type TaskPropsType = {
  title: string;
  description: string;
  status: string;
  dueAt: string;
  id: string;
  categoryName: string;
  categoryColor: string;
};

type TaskCardType = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  taskProps: TaskPropsType;
  type?: TaskListType;
};

const deleteTodoMutation = (id: string) => `
  mutation MyMutation {
    deleteTodo( id: "${id}")
  }
`;

const TaskCard = ({
  onPress,
  style,
  disabled = false,
  taskProps,
  type,
}: TaskCardType) => {
  const { tasks, dueTasks, setDueTasks, setTasks } = useContext(DataContext);

  const deleteTodo = async (id: string) => {
    try {
      const res = await API.graphql(graphqlOperation(deleteTodoMutation(id)));
      if (type === 'dueTasks') {
        const newDueTasks = dueTasks.filter((task) => task.id !== id);
        setDueTasks(newDueTasks);
      }
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      if (type === 'allTasks' && isDueTask(dueTasks, id)) {
        const newDueTasks = dueTasks.filter((task) => task.id !== id);
        setDueTasks(newDueTasks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { id, title, description, dueAt, status, categoryColor, categoryName } =
    taskProps;

  return (
    <Card disabled={disabled} onPress={onPress} style={style}>
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.title} category="h6">
            {title}
          </Text>
          <Layout style={styles.dateWrapper}>
            <Text style={styles.dateText} category="c1">
              <Text category="c2">Due at:</Text> {dueAt}
            </Text>
          </Layout>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.section} category="s1">
            {description}
          </Text>
          <View style={[styles.section, styles.status]}>
            <Status status={status} />
          </View>
        </View>
        <View style={styles.categorySection}>
          <Category color={categoryColor} name={categoryName} />
          {!disabled && (
            <Button
              onPress={() => deleteTodo(id)}
              style={{ marginLeft: 'auto' }}
              status="danger"
              size="tiny"
            >
              Delete
            </Button>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 8,
    marginBottom: 8,
  },
  dateWrapper: {
    flex: 2,
    marginLeft: 'auto',
  },
  dateText: {
    marginBottom: 4,
  },
  descriptionWrapper: {
    flexDirection: 'row',
  },
  section: {
    marginBottom: 16,
  },
  status: {
    paddingTop: 8,
    marginLeft: 'auto',
  },
  categorySection: {
    flexDirection: 'row',
  },
});

export default TaskCard;
