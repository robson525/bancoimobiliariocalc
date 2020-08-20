/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import nav from '../../constants/navigation';
import general from '../../constants/general';
import { GameContext } from '../../constants/gameContext';
import { Game } from '../../model/game';

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
            <MaterialCommunityIcons name="play-circle" size={88} color={general.Button.color} />
            <Text>Iniciar novo jogo</Text>
          </MiddleView.Button>
        </MiddleView.Container>
        <MiddleView.Container>
          <MiddleView.Button onPress={() => { }}>
            <MaterialCommunityIcons name="stop-circle" size={88} color={general.Button.color} />
            <Text>Pausar jogo</Text>
          </MiddleView.Button>
        </MiddleView.Container>
      </MiddleView>
      <BottonView />
    </>
  );
}

function SettingsScreen() {
  return (<></>);
}

function HomeTabStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name={nav.Screen.Home.name} component={HomeScreen} options={{ title: `${nav.Screen.Home.title}` }} />
      <Stack.Screen name={nav.Screen.Settings.name} component={SettingsScreen} options={{ title: `${nav.Screen.Settings.title}` }} />
    </Stack.Navigator>
  );
}

export default HomeTabStack;

const TopView = styled.View``;
TopView.Logo = styled.Text`
  text-align: center;
  font-size: 30px;
  padding-top: 25px;
  text-shadow: 1px 2px 10px;
  color: ${general.Color.default}
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
