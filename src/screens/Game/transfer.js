/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import general from '../../constants/general';
import { GameContext } from '../../constants/gameContext';
import PlayerSelection from '../../components/PlayerSelection';
import { Player } from '../../model/player';

const optionsDefault = [
  new Player({
    id: -1, name: 'Banco', color: 'black', icon: 'bank',
  }),
  new Player({
    id: 0, name: 'Todos', color: 'black', icon: 'account-multiple',
  }),
];

function Transfer({ navigation, route }) {
  const { params } = route;
  const { currentGame } = useContext(GameContext);

  const resultDefault = {
    from: currentGame.players.find((player) => player.id === params.playerId),
    to: optionsDefault[0],
    amount: 0,
  };
  const [result, setResult] = useState(resultDefault);

  const options = optionsDefault.concat(
    currentGame.players
      .sort((player) => (player.name)),
  );

  const change = () => {
    const { from, to, amount } = result;
    setResult({ from: to, to: from, amount });
  };

  return (
    <>
      <Container>
        <Container.DropDown>
          <Dropdow>
            <Dropdow.Label>De:</Dropdow.Label>
            <Dropdow.Selection
              selected={result.from}
              options={options}
              onValueChange={(value) => setResult({ ...result, from: value })}
            />
          </Dropdow>
          <Dropdow>
            <Dropdow.Label>Para:</Dropdow.Label>
            <Dropdow.Selection
              selected={result.to}
              options={options}
              onValueChange={(value) => setResult({ ...result, to: value })}
            />
          </Dropdow>
        </Container.DropDown>
        <Container.Invert
          onPress={change}
        >
          <MaterialCommunityIcons name="swap-vertical" size={40} color={general.Button.color} />
        </Container.Invert>
      </Container>
    </>
  );
}

export default Transfer;

const Container = styled.View`
  flex-direction: row;
`;
Container.DropDown = styled.View`
  flex: 8;
`;
Container.Invert = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Dropdow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
Dropdow.Label = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 16px;
`;
Dropdow.Selection = styled(PlayerSelection)`
  flex: 8;
`;
