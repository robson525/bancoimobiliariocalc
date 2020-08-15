/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import general from '../../constants/general';
import nav from '../../constants/navigation';
import { GameContext } from '../../constants/gameContext';
import { Player } from '../../model/player';

let editPlayer = false;

function Save(player, goBack, { currentGame, setCurrentGame }) {
  if (!player.name.length) {
    Alert.alert('Nome é obrigatório', 'Digite o nome do jogador');
    return;
  }

  const game = { ...currentGame };
  game.players.push(player);

  setCurrentGame(game);
  goBack();
}

function Delete(player, goBack, { currentGame, setCurrentGame, config }) {
  const remove = () => {
    const game = { ...currentGame };
    game.players.pop(player);

    setCurrentGame(game);
    goBack();
  };

  if (config.confirmActions) {
    Alert.alert('Excluir Jogador', `Tem certeza que deseja excluir o jogador: ${player.name} ?`,
      [
        { text: 'Cancelar' },
        { text: 'Confirmar', onPress: remove },
      ],
      {
        cancelable: true,
      });
  } else {
    remove();
  }
}

function Edit({ navigation, route }) {
  const { goBack } = navigation;
  const { params } = route;
  const gameContext = useContext(GameContext);
  const { currentGame, config } = gameContext;

  let currentPlayer = new Player();
  editPlayer = params.playerId > 0;

  if (editPlayer) {
    currentPlayer = currentGame.players.find((player) => player.id === params.playerId);
    navigation.setOptions({ title: nav.Screen.Edit.title2 });
  } else {
    currentPlayer.id = currentGame.players.length + 1;
    currentPlayer.amount = config.initialAmount;
    navigation.setOptions({ title: nav.Screen.Edit.title });
  }
  const [player, setPlayer] = useState(currentPlayer);

  return (
    <>
      <NameContainer>
        <Label>Nome do Jogador:</Label>
        <Name
          autoFocus
          value={player.name}
          placeholder="Digite um nome"
          placeholderTextColor={general.Color.placeholder}
          onChangeText={(name) => setPlayer({ ...player, name })}
        />
      </NameContainer>
      <ButtonContainer>
        <Button onPress={goBack}>
          <Button.Text>
            Cancelar
          </Button.Text>
        </Button>
        <Button
          color={general.Button.invertedBackgroud}
          onPress={() => Save(player, goBack, gameContext)}
        >
          <Button.Text color={general.Button.invertedColor}>
            Salvar
          </Button.Text>
        </Button>
        <Button
          hide={!editPlayer}
          color={general.Button.danger}
          onPress={() => Delete(currentPlayer, goBack, gameContext)}
        >
          <Button.Text color={general.Button.invertedColor}>
            Excluir
          </Button.Text>
        </Button>
      </ButtonContainer>
    </>
  );
}

export default Edit;

const NameContainer = styled.View`
    padding: 10px;
`;
const Label = styled.Text`
  color: ${general.Button.color};
`;
const Name = styled.TextInput`
  margin-top: 10px;
  font-size: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${general.Color.default};
`;

const ButtonContainer = styled.View`    
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`;
const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.color ?? general.Button.backgroud)};
  flex-basis: 40%;
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  margin: 10px ${(props) => (props.hide ? '10px' : '5px')};
  border-radius: 10px;
  elevation: 7;
`;

Button.Text = styled.Text`
  text-align: center;
  color: ${(props) => (props.color ?? general.Button.color)};
  padding: 10px;
`;
