/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Player } from '../../model/player';

function PlayerSelection({
  selected, options, onValueChange, description,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <Field
        onPress={() => setVisible(!visible)}
        onLongPress={() => Alert.alert(description.title, description.message)}
      >
        <Field.Icon name={selected.icon} size={40} color={selected.color} />
        <Field.Name color={selected.color}>{selected.name}</Field.Name>
      </Field>
      <Modal
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
                key={`${option.name}_${option.id}`}
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
                <Option.Name
                  color={option.color}
                >
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
  description: PropTypes.object.isRequired,
};

export default PlayerSelection;

const Container = styled.View`
  flex: 7;
  margin-top: 5px;
`;

const Field = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;
Field.Icon = styled(MaterialCommunityIcons)`
  flex: 1;
  text-align: center;
`;
Field.Name = styled.Text`
  flex: 4;
  font-size: 20px;
  padding-bottom: 5px;
  color: ${(props) => props.color};
  font-weight: bold;
  
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.color};
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
    border-bottom-width: 1px;
    border-bottom-color: #e6e6e6;
    padding: 5px;
`;
const Option = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    flex-basis: 33%;
    padding: 10px 0;
`;
Option.Name = styled.Text`
  color: ${(props) => props.color};
`;
