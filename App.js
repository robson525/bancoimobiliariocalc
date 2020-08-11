import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import config from './src/config';
import HomeTabStack from './src/screens/Home';
import GameTabStack from './src/screens/Game';
import SettingsTabStack from './src/screens/Settings';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={config.Tab.Home.name} component={HomeTabStack} options={{ title: `${config.Tab.Home.title}` }} />
      <Tab.Screen name={config.Tab.Game.name} component={GameTabStack} options={{ title: `${config.Tab.Game.title}` }} />
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
