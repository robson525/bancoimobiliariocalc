/* eslint-disable react/prop-types */
import React from 'react';
import { AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import config from './src/config';
import HomeTabStack from './src/screens/Home';
import GameTabStack from './src/screens/Game';
import SettingsTabStack from './src/screens/Settings';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={config.Tab.Home.name}
        component={HomeTabStack}
        options={{
          tabBarLabel: `${config.Tab.Home.title}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={config.Tab.Home.icon} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={config.Tab.Game.name}
        component={GameTabStack}
        options={{
          tabBarLabel: `${config.Tab.Game.title}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={config.Tab.Game.icon} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={config.Tab.Settings.name}
        component={SettingsTabStack}
        options={{
          title: `${config.Tab.Settings.title}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={config.Tab.Settings.icon} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

async function getGames() {
  const aux = await AsyncStorage.getAllKeys();
  console.log('AllKeys', aux);
}

export default function App() {
  getGames();
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
