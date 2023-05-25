import React from 'react';
import { View, Text } from '@react-pdf/renderer';

const MyComponentWrapper = ({ prop1, prop2 }) => (
  <View>
    <Text>{prop1}</Text>
    <Text>{prop2}</Text>
  </View>
);

export default MyComponentWrapper;
