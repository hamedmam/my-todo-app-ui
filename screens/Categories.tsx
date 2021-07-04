import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Card, Input, Button } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { getCategories, initCategories } from './TaskCreation';
import { DataContext } from '../providers/DataProvider';
import Category from '../components/atoms/Category';

const createNewCategory = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => `
  mutation MyMutation {
    createCategory(name: "${name}", color: "${color}") {
      id
      name
      color
    }
  }
`;

export default function Categories({ navigation }) {
  const { categories, setCategories } = useContext(DataContext);
  const [category, setCategory] = useState(initCategories[0]);
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

  const createCategory = async () => {
    try {
      const { name, color } = category;
      const res = await API.graphql(
        graphqlOperation(createNewCategory({ name, color }))
      );
      const newCategory = res.data.createCategory;
      const newCategories = categories.concat(newCategory);
      setCategories(newCategories);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout level="3" style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerWrapper}>
          {Boolean(categories.length) && (
            <Card style={styles.section} disabled>
              <View style={{ flexDirection: 'row' }}>
                {categories.map(({ id, name, color }) => (
                  <View key={id} style={{ marginRight: 8 }}>
                    <Category
                      navigation={navigation}
                      name={name}
                      color={color}
                    />
                  </View>
                ))}
              </View>
            </Card>
          )}

          <Input
            style={styles.section}
            placeholder="category name"
            value={category.name.toLocaleLowerCase()}
            onChangeText={(name) => setCategory({ ...category, name })}
          />
          <Input
            style={styles.section}
            placeholder="category color hex"
            value={category.color.toLocaleLowerCase()}
            onChangeText={(color) => setCategory({ ...category, color })}
          />

          <Button
            disabled={!category.color || !category.name}
            onPress={() => createCategory()}
          >
            Submit
          </Button>
        </View>
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
  section: {
    marginBottom: 16,
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 460,
  },
});
