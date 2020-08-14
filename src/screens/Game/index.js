/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Alert, Text, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import general from '../../constants/general';
import nav from '../../constants/navigation';
import alert from '../../constants/alerts';
import { GameContext } from '../../constants/gameContext';
import PlayerInfo from './PlayerInfo';

const Stack = createStackNavigator();

const TopView = styled.View`
  flex: 1;    
  flex-direction: row;
  flex-wrap: wrap;
`;
TopView.Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-basis: 20%;
  margin-top: 10px;
`;

TopView.Button.Text = styled.Text`
  text-align: center;
  color: ${general.Button.color};
`;

const MiddleView = styled.View`
  flex: 7;    
  flex-direction: row;
  flex-wrap: wrap;
`;
MiddleView.List = styled.FlatList`

`;

const BottonView = styled.View`
  flex: 1;
  background-color: blue;
`;

function GameScreen({ navigation }) {
  const { currentGame } = useContext(GameContext);
  const renderItem = ({ item }) => (
    <Text>{item.name}</Text>
  );

  return (
    <>
      <TopView>
        <TopView.Button
          onPress={() => navigation.navigate(nav.Screen.NewUser.name)}
          onLongPress={() => Alert.alert(alert.Game.AddLong.title, alert.Game.AddLong.msg)}
        >
          <MaterialIcons name="person-add" size={30} color={general.Button.color} />
          <TopView.Button.Text>Add</TopView.Button.Text>
        </TopView.Button>
      </TopView>

      <MiddleView>
        <MiddleView.List
          data={currentGame.players}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </MiddleView>

      <BottonView />
    </>
  );
}

function GameTabStack() {
  return (
    <Stack.Navigator initialRouteName={nav.Screen.Game.name}>
      <Stack.Screen name={nav.Screen.Game.name} component={GameScreen} options={{ title: `${nav.Screen.Game.title}` }} />
      <Stack.Screen name={nav.Screen.NewUser.name} component={PlayerInfo} options={{ title: `${nav.Screen.NewUser.title}` }} />
    </Stack.Navigator>
  );
}

export default GameTabStack;
