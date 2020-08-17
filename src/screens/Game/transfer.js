/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Alert, Picker } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import general from '../../constants/general';
import nav from '../../constants/navigation';
import alert from '../../constants/alerts';
import { GameContext } from '../../constants/gameContext';

const optionsDefault = [{ label: 'Banco', value: -1 }, { label: 'Todos', value: 0 }];

function Transfer({ navigation, route }) {
  const { params } = route;
  const { currentGame } = useContext(GameContext);

  const resultDefault = { from: params.playerId, to: -1, amount: 0 };
  const [result, setResult] = useState(resultDefault);

  const options = optionsDefault.concat(
    currentGame.players
      .sort((player) => (player.name))
      .map((player) => ({ label: player.name, value: player.id })),
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
            <Dropdow.Picker
              mode="dropdown"
              selectedValue={result.from}
              onValueChange={(value) => setResult({ ...result, from: value })}
            >
              { options.map((option) => (
                <Picker.Item label={option.label} value={option.value} key={option.value} />
              ))}
            </Dropdow.Picker>
          </Dropdow>
          <Dropdow>
            <Dropdow.Label>Para:</Dropdow.Label>
            <Dropdow.Picker
              mode="dropdown"
              selectedValue={result.to}
              onValueChange={(value) => setResult({ ...result, to: value })}
            >
              { options.map((option) => (
                <Picker.Item label={option.label} value={option.value} key={option.value} />
              ))}
            </Dropdow.Picker>
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
  flex: 9;
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
`;
Dropdow.Picker = styled.Picker`
  flex: 5;
  color: ${general.Color.default};
`;
