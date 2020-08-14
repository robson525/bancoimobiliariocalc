/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
import general from '../../constants/general';
import nav from '../../constants/navigation';
import alert from '../../constants/alerts';
import { GameContext } from '../../constants/gameContext';
import PlayerEdit from './PlayerEdit';

const Stack = createStackNavigator();

const TopView = styled.View`
  flex: 1;    
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
  elevation: 1;
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
MiddleView.ListItem = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;
MiddleView.PlayerImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;
MiddleView.PlayerName = styled.Text`
  flex: 4;
  padding-top: 5px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  text-align-vertical: center;
`;
MiddleView.PlayerAmount = styled.Text`
  flex: 2;
  padding-top: 5px;
  padding-right: 10px;
  font-size: 16px;
  text-align: right;
  text-align-vertical: center;
`;

const BottonView = styled.View`
  flex: 1;
  background-color: blue;
`;

function currencyFormat(amount) {
  return `$ ${amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}

function PlayerItem({ item }) {
  return (
    <MiddleView.ListItem>
      <MiddleView.PlayerImage>
        <MaterialIcons name="person" size={40} color={general.Button.color} />
      </MiddleView.PlayerImage>
      <MiddleView.PlayerName>
        {item.name}
      </MiddleView.PlayerName>
      <MiddleView.PlayerAmount>
        {currencyFormat(item.amount)}
      </MiddleView.PlayerAmount>
    </MiddleView.ListItem>
  );
}

function GameScreen({ navigation }) {
  const { currentGame } = useContext(GameContext);
  return (
    <>
      <TopView>
        <TopView.Button
          onPress={() => navigation.navigate(nav.Screen.PlayerEdit.name, { playerId: 0 })}
          onLongPress={() => Alert.alert(alert.Game.AddLong.title, alert.Game.AddLong.msg)}
        >
          <MaterialIcons name="person-add" size={30} color={general.Button.color} />
          <TopView.Button.Text>Add</TopView.Button.Text>
        </TopView.Button>
      </TopView>

      <MiddleView>
        <MiddleView.List
          data={currentGame.players}
          renderItem={PlayerItem}
          keyExtractor={(item) => `${item.id}`}
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
      <Stack.Screen name={nav.Screen.PlayerEdit.name} component={PlayerEdit} options={{ title: `${nav.Screen.PlayerEdit.title}` }} />
    </Stack.Navigator>
  );
}

export default GameTabStack;
