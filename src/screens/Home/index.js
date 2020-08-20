/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import nav from '../../constants/navigation';
import general from '../../constants/general';
import { GameContext } from '../../constants/gameContext';
import { Game } from '../../model/game';
import SettingsScreen from './settings';

const Stack = createStackNavigator();

function ReplaceCurrentGame(createGame) {
  Alert.alert(
    'Subistituir Jogo',
    'Já existe um jogo em andamento.\nDeseja criar um novo jogo assim mesmo ?',
    [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => {},
      },
      { text: 'Sim', onPress: createGame },
    ],
    { cancelable: false },
  );
}

function NewGame(gameContext, { navigate }) {
  const { currentGame, setCurrentGame } = gameContext;

  const createGame = () => {
    setCurrentGame(new Game());
    navigate(nav.Tab.Game.name);
  };

  if (currentGame.id && currentGame.players.length) {
    ReplaceCurrentGame(createGame);
  } else {
    createGame();
  }
}

function HomeScreen({ navigation }) {
  const gameContext = useContext(GameContext);

  return (
    <>
      <TopView>
        <TopView.Logo>Banco Imobiliário</TopView.Logo>
      </TopView>
      <MiddleView>
        <MiddleView.Container>
          <MiddleView.Button onPress={() => NewGame(gameContext, navigation)}>
            <MaterialCommunityIcons name="play" size={88} color={general.Button.color} />
            <Text>Iniciar Novo Jogo</Text>
          </MiddleView.Button>
        </MiddleView.Container>
        <MiddleView.Container>
          <MiddleView.Button onPress={() => navigation.navigate(nav.Screen.Settings.name)}>
            <Ionicons name="md-settings" size={88} color={general.Button.color} />
            <Text>Configuração</Text>
          </MiddleView.Button>
        </MiddleView.Container>
      </MiddleView>
      <BottonView />
    </>
  );
}

function HomeTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={nav.Screen.Home.name} component={HomeScreen} options={nav.Screen.Home.options} />
      <Stack.Screen name={nav.Screen.Settings.name} component={SettingsScreen} options={nav.Screen.Settings.options} />
    </Stack.Navigator>
  );
}

export default HomeTabStack;

const TopView = styled.View``;
TopView.Logo = styled.Text`
  font-family: 'PeaceSans';
  text-align: center;
  font-size: 30px;
  padding: 25px 0 10px 0;
  text-shadow: 1px 2px 10px;
  color: ${general.Color.default};
`;

const MiddleView = styled.View`
  flex: 8;    
  flex-direction: row;
  flex-wrap: wrap;
`;
MiddleView.Container = styled.View`
  align-items: center;
  flex-basis: 50%;  
`;
MiddleView.Button = styled.TouchableOpacity`
  align-items: center;
  width: 80%;
  margin-top: 20px;
  border-radius: 20px;
  padding: 5px;  
  text-shadow: 1px 1px 20px #000000;
  border: solid grey 1px;
  border-radius: 25px;
  background-color: #FFFFFF;
  elevation: 6;
`;
const BottonView = styled.View`
  flex: 1;
  background-color: blue;
`;
