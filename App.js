/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GameProvider, GameContext } from './src/constants/gameContext';
import general from './src/constants/general';
import nav from './src/constants/navigation';
import HomeTabStack from './src/screens/Home';
import GameTabStack from './src/screens/Game';
import { Game } from './src/model/game';
import { Config } from './src/model/config';

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

function Loading() {
  return (
    <>
    </>
  );
}

export default function App() {
  const [game, setGame] = useState({
    game: new Game(),
    config: new Config(),
    started: false,
  });

  const loadGameAndConfig = async () => {
    const sGame = await AsyncStorage.getItem(general.Storage.Game);
    const sConfig = await AsyncStorage.getItem(general.Storage.Config);

    setGame({
      game: new Game(sGame),
      config: new Config(sConfig),
      started: true,
    });
  };

  useEffect(() => {
    loadGameAndConfig();
  }, [game.started]);

  return (
    <NavigationContainer>
      <GameProvider currentGame={game.game} config={game.config}>
        {!game.started && <Loading />}
        {game.started && <MyTabs />}
      </GameProvider>
    </NavigationContainer>
  );
}
