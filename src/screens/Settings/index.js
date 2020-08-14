import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import nav from '../../constants/navigation';

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
      <Stack.Screen name={nav.Screen.Settings.name} component={SettingsScreen} options={{ title: `${nav.Screen.Settings.title}` }} />
    </Stack.Navigator>
  );
}

export default SettingsTabStack;
