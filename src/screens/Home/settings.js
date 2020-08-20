import React, { useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import general from '../../constants/general';
import { GameContext } from '../../constants/gameContext';

function SettingsScreen() {
  const { config, setConfig } = useContext(GameContext);

  return (
    <>
      <Container>
        <Label onPress={() => Alert.alert('Valor Inicial', 'Valor que será aplicado a cada jogador')}>
          <Label.Text>Valor Inicial:</Label.Text>
        </Label>
        <Input placeholder="Digite o Valor" value={`${config.initialAmount}`} />
      </Container>
      <Container>
        <Label onPress={() => Alert.alert('Confirmação', 'Exibir mensagem de confirmarção ao aplicar mudanças')}>
          <Label.Text>Confirmação:</Label.Text>
        </Label>
        <SwitchContainer>
          <Switch
            value={config.confirmActions}
            onValueChange={() => setConfig({ ...config, confirmActions: !config.confirmActions })}
            thumbColor={config.confirmActions ? general.Button.cobalto : general.Button.backgroud}
          />
        </SwitchContainer>
      </Container>
    </>
  );
}

export default SettingsScreen;

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
`;

const Label = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
`;
Label.Text = styled.Text`
  padding-right: 5px;
  text-align: right;
  font-size: 18px;
  color: ${general.Color.default};
`;
const Input = styled.TextInput.attrs({
  placeholderTextColor: general.Color.placeholder,
})`
  flex: 2;
  margin-top: 10px;
  font-size: 20px;
  padding-left: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${general.Color.default};
`;

const SwitchContainer = styled.View`
    flex: 2;
    align-items: flex-start;
`;
const Switch = styled.Switch.attrs({
  trackColor: { false: `${general.Color.placeholder}`, true: `${general.Color.default}` },
})``;
