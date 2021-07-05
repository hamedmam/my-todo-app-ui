import React, { useContext } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Text } from '@ui-kitten/components';
import { NavigationContext } from '@react-navigation/native';

const Status = ({ status }: { status: string }) => {
  const navigation = useContext(NavigationContext);
  const statusColor = status === 'todo' ? 'yellow' : 'green';
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('TasksByStatus', {
          status,
        })
      }
      style={{
        borderColor: statusColor,
        borderWidth: 2,
        padding: 4,
        borderRadius: 16,
        alignSelf: 'flex-start',
      }}
    >
      <View>
        <Text style={{ color: statusColor }} category="label">
          {status}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default Status;
