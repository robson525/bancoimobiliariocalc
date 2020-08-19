/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import { Alert } from 'react-native';
import general from '../../constants/general';
import { GameContext } from '../../constants/gameContext';
import PlayerSelection from '../../components/PlayerSelection';
import Confirmation from '../../components/Confirmation';
import { Player } from '../../model/player';

const optionsDefault = [
  new Player({
    id: -1, name: 'Banco', color: 'grey', icon: 'bank',
  }),
  new Player({
    id: 0, name: 'Todos', color: 'black', icon: 'account-multiple',
  }),
];

function Save(result, goBack, closeConfirmation, { currentGame, setCurrentGame }) {
  const resultAmount = parseInt(result.amount, 10);
  const game = { ...currentGame };
  const updateOne = (player, amount) => {
    player.amount += amount;
    game.players
      .find((p) => p.id === player.id)
      .amount = player.amount;
  };
  const updateAll = (player, amount) => {
    for (let i = 0; i < game.players.length; i += 1) {
      if (game.players[i].id !== player.id) {
        game.players[i].amount += amount;
      }
    }
  };

  if (result.from.id > 0) {
    const amount = result.to.id === 0
      ? (game.players.length - 1) * resultAmount * -1
      : resultAmount * -1;

    updateOne(result.from, amount);
  } else if (result.from.id === 0) {
    updateAll(result.to, resultAmount * -1);
  }

  if (result.to.id > 0) {
    const amount = result.from.id === 0
      ? resultAmount * (game.players.length - 1)
      : resultAmount;
    updateOne(result.to, amount);
  } else if (result.to.id === 0) {
    updateAll(result.from, resultAmount);
  }

  closeConfirmation();
  setCurrentGame(game);
  goBack();
}

function ModalConfirmation({
  visible, result, cancel, goBack, gameContext,
}) {
  return (
    <Confirmation
      visible={visible}
      title="Confirmar Transferência"
      onConfirm={() => Save(result, goBack, cancel, gameContext)}
      onCancel={cancel}
    >
      <ConfirmationBody>
        {'De: '}
        <Text color={result.from.color}>{result.from.name}</Text>
        {'\n\nPara: '}
        <Text color={result.to.color}>{result.to.name}</Text>
        {'\n\nValor: '}
        <Text color="green">{`$ ${result.amount}`}</Text>
      </ConfirmationBody>
    </Confirmation>
  );
}

function Transfer({ navigation, route }) {
  const { goBack } = navigation;
  const { params } = route;
  const gameContext = useContext(GameContext);
  const { currentGame, config } = gameContext;

  const resultDefault = {
    from: currentGame.players.find((player) => player.id === params.playerId),
    to: optionsDefault[0],
    amount: 0,
  };
  const [result, setResult] = useState(resultDefault);
  const [confirmation, showConfirmation] = useState(false);

  const options = optionsDefault.concat(
    currentGame.players
      .sort((p1, p2) => (p1.name.toUpperCase() > p2.name.toUpperCase())),
  );

  const change = () => {
    const { from, to, amount } = result;
    setResult({ from: to, to: from, amount });
  };

  const checkToSave = () => {
    if (!result.amount.length) {
      Alert.alert('Valor é obrigatório', 'Digite o valor a ser transferido');
    } else if (Number.isInteger(result.amount)) {
      Alert.alert('Valor é inválido', 'O Valor digitado é um numero inválido');
    } else if (config.confirmActions) {
      showConfirmation(true);
    } else {
      Save(result, goBack, () => {}, gameContext);
    }
  };

  return (
    <>
      <PlayerContainer>
        <PlayerContainer.DropDown>
          <Dropdow>
            <Dropdow.Label transform="rotateY(180deg)">
              <MaterialCommunityIcons name="bank-transfer-out" size={40} color="red" />
            </Dropdow.Label>
            <Dropdow.Selection
              selected={result.from}
              options={options}
              onValueChange={(value) => setResult({ ...result, from: value })}
              description={{ title: 'Transferir', message: 'Jogador que irá Transferir o dinheiro' }}
            />
          </Dropdow>
          <Dropdow>
            <Dropdow.Label>
              <MaterialCommunityIcons name="bank-transfer-in" size={40} color="green" />
            </Dropdow.Label>
            <Dropdow.Selection
              selected={result.to}
              options={options}
              onValueChange={(value) => setResult({ ...result, to: value })}
              description={{ title: 'Receber', message: 'Jogador que irá Receber o dinheiro' }}
            />
          </Dropdow>
        </PlayerContainer.DropDown>
        <PlayerContainer.Invert
          onPress={change}
          onLongPress={() => Alert.alert('Inverter', 'Inverte / Troca quem vai Transferir e quem vai Receber')}
        >
          <MaterialCommunityIcons name="swap-vertical" size={40} color={general.Button.color} />
        </PlayerContainer.Invert>
      </PlayerContainer>

      <Amount>
        <Amount.Icon
          name="currency-usd"
          size={40}
          color="green"
        />
        <Amount.Input
          keyboardType="phone-pad"
          maxLength={6}
          placeholder="Valor"
          placeholderTextColor="#93bf85"
          onChangeText={(value) => setResult({ ...result, amount: value })}
        />
      </Amount>

      <ButtonContainer>
        <Button onPress={goBack}>
          <Button.Text>
            Cancelar
          </Button.Text>
        </Button>
        <Button
          color={general.Button.invertedBackgroud}
          onPress={checkToSave}
        >
          <Button.Text color={general.Button.invertedColor}>
            Salvar
          </Button.Text>
        </Button>
      </ButtonContainer>

      { config.confirmActions && (
        <ModalConfirmation
          visible={confirmation}
          result={result}
          cancel={() => showConfirmation(false)}
          goBack={goBack}
          gameContext={gameContext}
        />
      )}
    </>
  );
}

export default Transfer;

const PlayerContainer = styled.View`
  flex-direction: row;
`;
PlayerContainer.DropDown = styled.View`
  flex: 8;
`;
PlayerContainer.Invert = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 5px;
  padding-top: 10px;
`;

const Dropdow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
Dropdow.Label = styled.View`
  flex: 1;
  padding: 5px;
  align-items: center;
  justify-content: center;
  ${(props) => (props.transform ? (`transform: ${props.transform}`) : '')}
`;
Dropdow.Selection = styled(PlayerSelection)`
  flex: 8;
`;

const Amount = styled.View`
  flex-direction: row;
  margin: 50px;
`;
Amount.Icon = styled(MaterialCommunityIcons)`
  flex: 1;
  text-align: center;
`;
Amount.Input = styled.TextInput`
  flex: 4;
  font-size: 25px;
  color: green;
  padding-left: 5px;
  border-bottom-width: 1px;
  border-bottom-color: green;
  font-weight: bold;
  text-decoration: none;
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

const ConfirmationBody = styled.Text`
  font-size: 16px;
  text-align: center;
`;
const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.color};
`;
