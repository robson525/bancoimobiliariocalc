/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Player } from '../../model/player';

function PlayerSelection({
  selected, options, onValueChange,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <Field onPress={() => setVisible(!visible)}>
        <Field.Icon name={selected.icon} size={40} color={selected.color} />
        <Field.Name>{selected.name}</Field.Name>
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
            <Header.Text>Selecione uma opção</Header.Text>
          </Header>
          <Body>
            { options.map((option) => (
              <Option
                key={`${option}_${option.id}`}
                onPress={() => {
                  setVisible(false);
                  onValueChange(option);
                }}
              >
                <MaterialCommunityIcons
                  name={option.icon}
                  size={40}
                  color={option.color}
                />
                <Option.Name>
                  {option.name}
                </Option.Name>
              </Option>
            ))}
          </Body>
        </ModalContent>
      </Modal>
    </Container>
  );
}

PlayerSelection.propTypes = {
  selected: PropTypes.instanceOf(Player).isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Player)).isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default PlayerSelection;

const Container = styled.View`
  flex: 7;
`;

const Field = styled.TouchableOpacity`
  flex-direction: row;
`;
Field.Icon = styled(MaterialCommunityIcons)`
  flex: 1;
`;
Field.Name = styled.Text`
  flex: 3;
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
    border-bottom-width: 1px;
    border-bottom-color: #e6e6e6;
`;
const Option = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;
Option.Name = styled.Text``;
