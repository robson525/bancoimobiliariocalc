/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Alert, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import general from '../../constants/general';
import nav from '../../constants/navigation';
import alert from '../../constants/alerts';
import { GameContext } from '../../constants/gameContext';

function FormatAmount(amount) {
  return `$ ${amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}

function RenderPlayerItem(player, navigation) {
  return (
    <PlayerItem>
      <PlayerItem.Info
        onPress={() => navigation.navigate(nav.Screen.Tranfer.name, { playerId: player.id })}
      >
        <PlayerItem.Image>
          <MaterialCommunityIcons name={player.icon} size={40} color={player.color} />
        </PlayerItem.Image>
        <PlayerItem.Name>
          {player.name}
        </PlayerItem.Name>
        <PlayerItem.Amount>
          {FormatAmount(player.amount)}
        </PlayerItem.Amount>
      </PlayerItem.Info>
      <PlayerItem.Option
        onPress={() => navigation.navigate(nav.Screen.Edit.name, { playerId: player.id })}
      >
        <MaterialCommunityIcons name="pencil" size={20} color={player.color} />
      </PlayerItem.Option>
    </PlayerItem>
  );
}

function AddPlayer(currentGame, navigation) {
  if (currentGame.players.length >= 6) {
    Alert.alert('Máximo de jogadores', 'O numero máxio de jogadores é 6');
  } else {
    navigation.navigate(nav.Screen.Edit.name, { playerId: 0 });
  }
}

function Players({ navigation }) {
  const { currentGame } = useContext(GameContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton
          onPress={() => AddPlayer(currentGame, navigation)}
          onLongPress={() => Alert.alert(alert.Game.AddLong.title, alert.Game.AddLong.msg)}
        >
          <MaterialIcons name="person-add" size={30} color={general.Button.color} />
        </AddButton>
      ),
    });
  }, [navigation, Alert]);

  return (
    <>
      <MiddleView>
        <List
          data={currentGame.players}
          renderItem={({ item }) => RenderPlayerItem(item, navigation)}
          keyExtractor={(item) => `${item.id}`}
        />
      </MiddleView>

      <BottonView />
    </>
  );
}

export default Players;

const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-right: 20px;
`;

const MiddleView = styled.View`
  flex: 7;    
  flex-direction: row;
  flex-wrap: wrap;
`;
const List = styled.FlatList``;
const PlayerItem = styled.View`
  flex-direction: row;  
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;
PlayerItem.Info = styled.TouchableOpacity`
  flex-direction: row;
  flex: 9;
`;
PlayerItem.Option = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
PlayerItem.Image = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;
PlayerItem.Name = styled.Text`
  flex: 4;
  padding-top: 5px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  text-align-vertical: center;
`;
PlayerItem.Amount = styled.Text`
  flex: 2;
  padding-top: 5px;
  padding-right: 10px;
  font-size: 16px;
  text-align: right;
  text-align-vertical: center;
`;

const BottonView = styled.View`
  flex: 1;
`;
