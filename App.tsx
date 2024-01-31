import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigator } from './src/navigator/Navigator';

export const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};
