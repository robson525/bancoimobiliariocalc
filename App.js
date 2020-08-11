import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import config from './src/config';
import HomeScreen from './src/screens/Home';
import SettingsScreen from './src/screens/Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={config.Screen.Home.name} component={HomeScreen} options={{ title: `${config.Screen.Home.title}` }} />
    </Stack.Navigator>
  );
}

function SettingsTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={config.Screen.Settings.name} component={SettingsScreen} options={{ title: `${config.Screen.Settings.title}` }} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={config.Tab.Home.name} component={HomeTabStack} options={{ title: `${config.Tab.Home.title}` }} />
      <Tab.Screen name={config.Tab.Settings.name} component={SettingsTabStack} options={{ title: `${config.Tab.Settings.title}` }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
