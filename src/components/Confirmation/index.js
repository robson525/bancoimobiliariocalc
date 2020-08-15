import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import general from '../../constants/general';

function Confirmation({
  visible, title, message, onConfirm, onCancel,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {}}
    >
      <ModalContent>
        <Header>
          <Header.Text>{title}</Header.Text>
        </Header>
        <Body>
          <Body.Text>{message}</Body.Text>
        </Body>
        <Footer>
          <Button
            onPress={onCancel}
          >
            <Button.Text>Cancelar</Button.Text>
          </Button>
          <Button
            onPress={onConfirm}
          >
            <Button.Text>Connfirmar</Button.Text>
          </Button>
        </Footer>
      </ModalContent>
    </Modal>
  );
}

Confirmation.defaultProps = {
  onCancel: () => {},
};

Confirmation.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default Confirmation;

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
    padding-top: 20px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #e6e6e6;
`;
Body.Text = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`;
const Footer = styled.View`
    padding-top: 20px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #e6e6e6;
`;
const Button = styled.TouchableOpacity`
    padding: 15px;
`;
Button.Text = styled.Text`
    text-align: center;
    font-size: 16px;
    color: ${general.Color.default};
`;
