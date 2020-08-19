import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import general from '../../constants/general';

function Confirmation({
  visible, title, onConfirm, onCancel, children,
}) {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      backdropOpacity={0.5}
    >
      <ModalContent>
        <Header>
          <Header.Text>{title}</Header.Text>
        </Header>
        <Body>
          {children}
        </Body>
        <Footer>
          <Button
            onPress={onCancel}
          >
            <Button.Text>Cancelar</Button.Text>
          </Button>
          <Button
            onPress={onConfirm}
            confirm
          >
            <Button.Text confirm>Confirmar</Button.Text>
          </Button>
        </Footer>
      </ModalContent>
    </Modal>
  );
}

Confirmation.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
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
  padding: 20px 10px;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
`;
const Footer = styled.View`
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
`;
const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 15px;
  background-color: ${(props) => (props.confirm ? general.Button.invertedBackgroud : general.Button.backgroud)};
  ${(props) => (props.confirm ? 'border-bottom-right-radius' : 'border-bottom-left-radius')}: 5px;
`;
Button.Text = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${(props) => (props.confirm ? general.Button.invertedColor : general.Button.color)};
`;
