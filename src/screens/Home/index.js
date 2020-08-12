import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import config from '../../config';

const Stack = createStackNavigator();

const TopView = styled.View`
  flex: 1;
  background-color: red;
`;

const BottonView = styled.View`
  flex: 1;
  background-color: blue;
`;

// eslint-disable-next-line react/prop-types
function HomeScreen({ navigation: { navigate } }) {
  return (
    <>
      <TopView />
      <BottonView />
    </>
  );
}

function HomeTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={config.Screen.Home.name} component={HomeScreen} options={{ title: `${config.Screen.Home.title}` }} />
    </Stack.Navigator>
  );
}

export default HomeTabStack;
