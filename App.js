/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Font from 'expo-font';
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
  return (<></>);
}

function Content() {
  const [started, setStarted] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const { setStartState } = useContext(GameContext);

  const loadFonts = () => Font.loadAsync({
    PeaceSans: require('./src/assets/fonts/PeaceSans.otf'),
  }).then(() => setFontLoaded(true));

  const loadGameAndConfig = async () => {
    let sGame = await AsyncStorage.getItem(general.Storage.Game);
    const sConfig = await AsyncStorage.getItem(general.Storage.Config);
    // eslint-disable-next-line no-undef
    if (__DEV__ && sGame === null) {
      sGame = Game.CreateTest();
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

  useEffect(() => {
    loadFonts();
  }, [fontLoaded]);

  return (
    <>
      {(!started || !fontLoaded) && <Loading />}
      {started && fontLoaded && <MyTabs />}
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
