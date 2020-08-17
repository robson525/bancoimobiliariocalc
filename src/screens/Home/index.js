import React, { useContext } from 'react';
import { Text, Alert, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import nav from '../../constants/navigation';
import general from '../../constants/general';
import { GameContext } from '../../constants/gameContext';
import { Game } from '../../model/game';
import { Player } from '../../model/player';

const Stack = createStackNavigator();

const TopView = styled.View`
  flex: 8;    
  flex-direction: row;
  flex-wrap: wrap;
`;
TopView.Container = styled.View`
  align-items: center;
  flex-basis: 50%;  
`;
TopView.Button = styled.TouchableOpacity`
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

async function getGames() {
  const aux = await AsyncStorage.getAllKeys();
}

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

// eslint-disable-next-line react/prop-types
function HomeScreen({ navigation }) {
  const gameContext = useContext(GameContext);

  return (
    <>
      <TopView>
        <TopView.Container>
          <TopView.Button onPress={() => { NewGame(gameContext, navigation); }}>
            <MaterialCommunityIcons name="play-circle" size={88} color={general.Button.color} />
            <Text>Iniciar novo jogo</Text>
          </TopView.Button>
        </TopView.Container>
        <TopView.Container>
          <TopView.Button onPress={() => { }}>
            <MaterialCommunityIcons name="stop-circle" size={88} color={general.Button.color} />
            <Text>Pausar jogo</Text>
          </TopView.Button>
        </TopView.Container>
      </TopView>
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
