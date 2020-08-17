/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GameProvider } from './src/constants/gameContext';
import nav from './src/constants/navigation';
import HomeTabStack from './src/screens/Home';
import GameTabStack from './src/screens/Game';
import SettingsTabStack from './src/screens/Settings';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={nav.Tab.Home.name}
        component={HomeTabStack}
        options={{
          tabBarLabel: `${nav.Tab.Home.title}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={nav.Tab.Home.icon} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={nav.Tab.Game.name}
        component={GameTabStack}
        options={{
          tabBarLabel: `${nav.Tab.Game.title}`,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={nav.Tab.Game.icon} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <GameProvider>
        <MyTabs />
      </GameProvider>
    </NavigationContainer>
  );
}
