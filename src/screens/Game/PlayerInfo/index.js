/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import general from '../../../constants/general';
import { GameContext } from '../../../constants/gameContext';
import { Player } from '../../../model/player';

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
`;
const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.color ?? general.Button.backgroud)};
  flex-basis: 40%;
  margin: 10px;
  border-radius: 10px;
  elevation: 7;
`;

Button.Text = styled.Text`
  text-align: center;
  color: ${(props) => (props.color ?? general.Button.color)}
  padding: 10px;
`;

function CreateNew(name, goBack, { currentGame, setCurrentGame, config }) {
  if (!name.length) {
    Alert.alert('Nome é obrigatório', 'Digite o nome do jogador');
    return;
  }
  const player = new Player(name, config.initialAmout);
  const game = { ...currentGame };
  game.players.push(player);
  setCurrentGame(game);
  goBack();
}

function NewPlayer({ navigation }) {
  const { goBack } = navigation;
  const gameContext = useContext(GameContext);
  const [name, setName] = useState('');
  return (
    <>
      <NameContainer>
        <Label>Nome do Jogador:</Label>
        <Name
          placeholder="Digite um nome"
          placeholderTextColor={general.Color.placeholder}
          onChangeText={(value) => setName(value)}
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
          onPress={() => CreateNew(name, goBack, gameContext)}
        >
          <Button.Text color={general.Button.invertedColor}>
            Salvar
          </Button.Text>
        </Button>
      </ButtonContainer>
    </>
  );
}

export default NewPlayer;
