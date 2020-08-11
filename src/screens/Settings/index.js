import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import config from '../../config';

const Stack = createStackNavigator();

function SettingsScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>
        SettingsScreen
      </Text>
    </View>
  );
}

function SettingsTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={config.Screen.Settings.name} component={SettingsScreen} options={{ title: `${config.Screen.Settings.title}` }} />
    </Stack.Navigator>
  );
}

export default SettingsTabStack;
