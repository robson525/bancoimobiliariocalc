/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Player } from '../../model/player';

function PlayerIconColor({
  type, player, options, onValueChange,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Field onPress={() => setVisible(!visible)}>
        <MaterialCommunityIcons name={player.icon} size={40} color={player.color} />
      </Field>
      <Modal
        animationType="slide"
        transparent
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
      >
        <ModalContent>
          <Header>
            <Header.Text>{type === 'color' ? 'Selecione uma Cor' : 'Selecione um Ícone'}</Header.Text>
          </Header>
          <Body>
            { options.map((option, i) => (
              <Option
                key={`${option}_${i}`}
                onPress={() => {
                  setVisible(false);
                  onValueChange(option);
                }}
              >
                <MaterialCommunityIcons
                  name={type === 'icon' ? option : player.icon}
                  size={40}
                  color={type === 'color' ? option : player.color}
                />
              </Option>
            ))}
          </Body>
        </ModalContent>
      </Modal>
    </>
  );
}

PlayerIconColor.propTypes = {
  type: PropTypes.string.isRequired,
  player: PropTypes.instanceOf(Player).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default PlayerIconColor;

const Field = styled.TouchableOpacity`
  padding: 5px;
  text-align: center;
  align-items: center;
`;

const ModalContent = styled.View`
    background-color: white;
    border-radius: 5px;
    margin: 20px;
`;
const Header = styled.View`
    padding-top: 20px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #e6e6e6;
`;
Header.Text = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`;
const Body = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #e6e6e6;
`;
const Option = styled.TouchableOpacity`
    padding: 15px;
    flex-basis: 33%;
    justify-content: center;
    align-items: center;
`;
