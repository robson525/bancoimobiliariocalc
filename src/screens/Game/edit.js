/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import general from '../../constants/general';
import nav from '../../constants/navigation';
import { GameContext } from '../../constants/gameContext';
import { Player } from '../../model/player';
import PlayerIconColor from '../../components/PlayerIconColor';

let editPlayer = false;

function Save(player, goBack, { currentGame, setCurrentGame }) {
  if (!player.name.length) {
    Alert.alert('Nome é obrigatório', 'Digite o nome do jogador');
    return;
  }

  const game = { ...currentGame };
  if (editPlayer) {
    currentGame.players.forEach((p, i) => {
      if (p.id === player.id) {
        game.players[i] = player;
      }
    });
  } else {
    game.players.push(player);
  }

  setCurrentGame(game);
  goBack();
}

function Delete(player, { setParams, goBack }, { currentGame, setCurrentGame, config }) {
  const remove = () => {
    const game = { ...currentGame };
    game.players.splice(currentGame.players.findIndex((p) => p.id === player.id), 1);
    setParams({ playerId: 0 });
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

  const usedColors = currentGame.players.map((player) => player.color);
  const optionsColors = general.Color.options.filter((color) => usedColors.indexOf(color) < 0);

  let currentPlayer = new Player();
  editPlayer = params.playerId > 0;

  if (editPlayer) {
    currentPlayer = currentGame.players.find((player) => player.id === params.playerId);
    navigation.setOptions({ title: nav.Screen.Edit.title2 });
    optionsColors.splice(0, 0, currentPlayer.color);
  } else {
    currentPlayer.id = currentGame.players.length === 0 ? 1
      : Math.max.apply(null, currentGame.players.map((player) => player.id)) + 1;

    currentPlayer.amount = config.initialAmount;
    currentPlayer.color = optionsColors.length ? optionsColors[0] : general.Color.default;
    navigation.setOptions({ title: nav.Screen.Edit.title1 });
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
          maxLength={15}
          onChangeText={(name) => setPlayer(new Player({ ...player, name }))}
        />
      </NameContainer>
      <OptionsContainer>
        <OptionsContainer.Color>
          <Label>Cor</Label>
          <PlayerIconColor
            type="color"
            player={player}
            options={optionsColors}
            onValueChange={(color) => setPlayer(new Player({ ...player, color }))}
          />
        </OptionsContainer.Color>
        <OptionsContainer.Icon>
          <Label>Ícone</Label>
          <PlayerIconColor
            type="icon"
            player={player}
            options={general.Icons.options}
            onValueChange={(icon) => setPlayer(new Player({ ...player, icon }))}
          />
        </OptionsContainer.Icon>
      </OptionsContainer>
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
          onPress={() => Delete(currentPlayer, navigation, gameContext)}
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
  color: ${general.Color.default};
`;
const Name = styled.TextInput.attrs({
  placeholderTextColor: general.Color.placeholder,
})`
  margin-top: 10px;
  font-size: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${general.Color.default};
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  padding: 10px;
`;
OptionsContainer.Icon = styled.View`
  flex: 1;
`;
OptionsContainer.Color = styled.View`
  flex: 1;
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
