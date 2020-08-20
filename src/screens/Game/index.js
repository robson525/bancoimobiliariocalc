/* eslint-disable max-len */
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
      <Stack.Screen name={nav.Screen.Game.name} component={Players} options={nav.Screen.Game.options} />
      <Stack.Screen name={nav.Screen.Edit.name} component={Edit} options={nav.Screen.Edit.options} />
      <Stack.Screen name={nav.Screen.Tranfer.name} component={Transfer} options={nav.Screen.Tranfer.options} />
    </Stack.Navigator>
  );
}

export default GameTabStack;
