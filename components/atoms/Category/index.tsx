import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

const Category = ({
  name,
  color,
  navigation,
}: {
  name: string;
  color: string;
  navigation?: any;
}) => (
  <TouchableOpacity
    onPress={() =>
      navigation &&
      navigation.navigate('TasksByCategory', {
        categoryName: name,
      })
    }
    style={{
      borderColor: color,
      borderWidth: 2,
      padding: 4,
      borderRadius: 16,
      alignSelf: 'flex-start',
    }}
  >
    <View>
      <Text style={{ color }} category="label">
        {name}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Category;
