/* eslint-disable react/prop-types */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import nav from '../../constants/navigation';
import Players from './players';
import Edit from './edit';
import Transfer from './transfer';

const Stack = createStackNavigator();

function GameTabStack() {
  return (
    <Stack.Navigator initialRouteName={nav.Screen.Game.name}>
      <Stack.Screen name={nav.Screen.Game.name} component={Players} options={{ title: `${nav.Screen.Game.title}` }} />
      <Stack.Screen name={nav.Screen.Edit.name} component={Edit} options={{ title: `${nav.Screen.Edit.title}` }} />
      <Stack.Screen name={nav.Screen.Tranfer.name} component={Transfer} options={{ title: `${nav.Screen.Tranfer.title}` }} />
    </Stack.Navigator>
  );
}

export default GameTabStack;
