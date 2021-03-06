import React, { useContext } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Text } from '@ui-kitten/components';
import { NavigationContext } from '@react-navigation/native';

const Category = ({ name, color }: { name: string; color: string }) => {
  const navigation = useContext(NavigationContext);
  return (
    <TouchableHighlight
      onPress={() =>
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
    </TouchableHighlight>
  );
};

export default Category;
