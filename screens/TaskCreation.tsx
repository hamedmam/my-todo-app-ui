import {
  Text,
  Layout,
  Input,
  Datepicker,
  Button,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import TaskCard from '../components/molecules/TaskCard';
import { useContext } from 'react';
import { DataContext } from '../providers/DataProvider';
import { createTodo, getCategories } from '../queries';

export const initCategories = [{ id: '', name: '', color: '' }];

const setDateInNumber = (date: number) => (date < 10 ? '0' + date : date);

export const transformDateToNumber = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = setDateInNumber(date.getMonth()).toString();
  const day = setDateInNumber(date.getDate()).toString();
  return Number(year + month + day);
};

export default function TaskCreation() {
  const { tasks, dueTasks, setTasks, setDueTasks, categories, setCategories } =
    useContext(DataContext);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(
    new IndexPath(0)
  );
  const selectedCategory = categories[selectedCategoryIndex.row];
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueAt: new Date(),
    category: selectedCategory,
  });

  const getUserCategories = async () => {
    try {
      const res = await API.graphql(graphqlOperation(getCategories));
      setCategories(res.data.getCategories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserCategories();
  }, []);

  useEffect(() => {
    setTask({ ...task, category: selectedCategory });
  }, [selectedCategory]);

  const { title, description, category, dueAt } = task;

  const createTask = async () => {
    try {
      const parsedDate = transformDateToNumber(dueAt);
      const res = await API.graphql(
        graphqlOperation(
          createTodo({
            title,
            description,
            categoryName: category.name,
            categoryColor: category.color,
            dueAt: parsedDate,
          })
        )
      );
      const isDueTask = dueAt.toDateString() === new Date().toDateString();
      const newTask = res.data.createTodo;
      if (isDueTask) {
        const dueTasksClone = [...dueTasks];
        dueTasksClone.unshift(newTask);
        setDueTasks(dueTasksClone);
      }

      const tasksClone = [...tasks];
      tasksClone.unshift(newTask);
      setTasks(tasksClone);
    } catch (err) {
      console.log(err);
    }
  };

  if (!categories.length) {
    return (
      <Layout level="3" style={styles.container}>
        <Layout level="3" style={styles.innerWrapper}>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text>To Create tasks we first need to crate a category :) </Text>
          </View>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout level="3" style={styles.container}>
      <Layout level="3" style={styles.innerWrapper}>
        <TaskCard
          disabled={true}
          style={styles.section}
          title={task.title}
          description={task.description}
          dueAt={task.dueAt.toDateString()}
          category={{
            name: selectedCategory?.name,
            color: task.category?.color?.toLowerCase(),
          }}
        />

        <Input
          style={styles.section}
          placeholder="Title"
          value={task.title}
          onChangeText={(value) => setTask({ ...task, title: value })}
        />
        <Input
          style={styles.section}
          placeholder="Description"
          value={task.description}
          onChangeText={(value) => setTask({ ...task, description: value })}
        />
        <Text category="label" style={styles.title}>
          Due at
        </Text>
        <Datepicker
          style={[styles.section, styles.datePicker]}
          date={task.dueAt}
          onSelect={(value) => {
            setTask({
              ...task,
              dueAt: value,
            });
          }}
        />
        <Text category="label" style={styles.title}>
          Category
        </Text>
        <Select
          style={styles.section}
          selectedIndex={selectedCategoryIndex}
          placeholder="Default"
          value={selectedCategory?.name}
          onSelect={(index) => setSelectedCategoryIndex(index)}
        >
          {categories.map(({ id, name }) => (
            <SelectItem key={id} title={name} />
          ))}
        </Select>
        <Button
          disabled={!title || !description || !category.name}
          onPress={() => createTask()}
        >
          Create Todo
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 460,
  },
  datePicker: {
    width: '100%',
  },
  section: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 4,
  },
});
