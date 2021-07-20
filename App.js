import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Camera from './Camera';
import Home from './Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Camera" component={Camera}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}