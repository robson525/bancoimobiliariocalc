import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import config from '../../config';

const Stack = createStackNavigator();

function GameScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>
        Game
      </Text>
    </View>
  );
}

function GameTabStack({ navigation, route }) {
  console.log('params', route);
  return (
    <Stack.Navigator>
      <Stack.Screen name={config.Screen.Game.name} component={GameScreen} options={{ title: `${config.Screen.Game.title}` }} />
    </Stack.Navigator>
  );
}

export default GameTabStack;
