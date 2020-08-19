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
import { Player } from './src/model/player';

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

function Content() {
  const [started, setStarted] = useState(false);
  const { setStartState } = useContext(GameContext);

  const loadGameAndConfig = async () => {
    let sGame = await AsyncStorage.getItem(general.Storage.Game);
    const sConfig = await AsyncStorage.getItem(general.Storage.Config);
    if (true || __DEV__) {
      if (true || sGame === null) {
        const g = new Game();
        g.players = [
          new Player({
            id: 1, name: 'Robson', amount: 2500, color: general.Color.options[0], icon: general.Icons.options[0],
          }),
          new Player({
            id: 2, name: 'Cibele', amount: 2500, color: general.Color.options[1], icon: general.Icons.options[0],
          }),
          new Player({
            id: 3, name: 'Maria', amount: 2500, color: general.Color.options[2], icon: general.Icons.options[0],
          }),
          new Player({
            id: 4, name: 'Carlito', amount: 2500, color: general.Color.options[3], icon: general.Icons.options[0],
          }),
          new Player({
            id: 5, name: 'Juliana', amount: 2500, color: general.Color.options[4], icon: general.Icons.options[0],
          }),
          new Player({
            id: 6, name: 'Matheus', amount: 2500, color: general.Color.options[5], icon: general.Icons.options[0],
          }),
        ];
        sGame = JSON.stringify(g);
      }
    }

    setStarted(true);
    setStartState(
      new Game(JSON.parse(sGame)),
      new Config(JSON.parse(sConfig)),
    );
  };

  useEffect(() => {
    loadGameAndConfig();
  }, [started]);

  return (
    <>
      {!started && <Loading />}
      {started && <MyTabs />}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <GameProvider>
        <Content />
      </GameProvider>
    </NavigationContainer>
  );
}
