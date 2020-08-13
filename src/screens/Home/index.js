import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import config from '../../config';
import { Game } from '../../model/game';

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
  border-radius: 20px;
  padding: 5px;  
  text-shadow: 1px 1px 20px #000000;
  border: solid grey 1px;
  border-radius: 25;
  background-color: #FFFFFF;
  elevation: 6;
`;

const BottonView = styled.View`
  flex: 1;
  background-color: blue;
`;

function NewGame(navigation) {
  navigation.navigate(config.Tab.Game.name, { currentGame: new Game() });
}

// eslint-disable-next-line react/prop-types
function HomeScreen(props) {
  return (
    <>
      <TopView>
        <TopView.Container>
          <TopView.Button onPress={() => { NewGame(props.navigation); }}>
            <MaterialCommunityIcons name="play-circle" size={88} color="#0C3AB7" />
            <Text>Iniciar novo jogo</Text>
          </TopView.Button>
        </TopView.Container>
        <TopView.Container>
          <TopView.Button onPress={() => { }}>
            <MaterialCommunityIcons name="stop-circle" size={88} color="#0C3AB7" />
            <Text>Pausar jogo</Text>
          </TopView.Button>
        </TopView.Container>
      </TopView>
      <BottonView />
    </>
  );
}

function HomeTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={config.Screen.Home.name} component={HomeScreen} options={{ title: `${config.Screen.Home.title}` }} />
    </Stack.Navigator>
  );
}

export default HomeTabStack;
