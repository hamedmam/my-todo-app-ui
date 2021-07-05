import React from 'react';
import { Card, Text, Layout, Button } from '@ui-kitten/components';
import { StyleProp, ViewStyle, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import Category from '../../atoms/Category';
import { useContext } from 'react';
import { DataContext, Tasks } from '../../../providers/DataProvider';

export type TaskListType = 'dueTasks' | 'allTasks';

const isDueTask = (dueTasks: Tasks, id: string) =>
  dueTasks.find((task) => task.id === id);

type CategoryType = {
  name: string;
  color: string;
};

type TaskCardType = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  title: string;
  description: string;
  dueAt: string;
  id: string;
  category: CategoryType;
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
  title,
  description,
  dueAt,
  id,
  disabled = false,
  category = { name: '', color: 'white' },
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

  return (
    <Card disabled={disabled} onPress={onPress} style={style}>
      <Layout style={{ backgroundColor: 'transparent' }}>
        <Layout
          style={{ backgroundColor: 'transparent', flexDirection: 'row' }}
        >
          <Text style={{ flex: 8, marginBottom: 8 }} category="h6">
            {title}
          </Text>
          <Layout style={{ flex: 2, marginLeft: 'auto' }}>
            <Text style={{ marginBottom: 4 }} category="c1">
              <Text category="c2">Due at:</Text> {dueAt}
            </Text>
          </Layout>
        </Layout>
        <Text style={{ marginBottom: 16 }} category="s1">
          {description}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Category color={category.color} name={category.name} />
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
      </Layout>
    </Card>
  );
};

export default TaskCard;
