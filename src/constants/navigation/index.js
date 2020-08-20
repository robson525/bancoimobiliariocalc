import general from '../general';

const options = {
  title: '',
  headerTintColor: general.Color.default,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Screen = {
  Home: { name: 'HomeScreen', options: { ...options, title: 'Início' } },
  Game: { name: 'GameScreen', options: { ...options, title: 'Jogo' } },
  Settings: { name: 'SettingsScreen', options: { ...options, title: 'Configuração' } },
  Edit: {
    name: 'EditScreen', title1: 'Criar de Jogador', title2: 'Editar do Jogador', options: { ...options, title: 'Criar de Jogador' },
  },
  Tranfer: { name: 'TranferScreen', options: { ...options, title: 'Transferência' } },
};
const Tab = {
  Home: { name: 'HomeTab', icon: 'home', title: 'Inicio' },
  Game: { name: 'GameTab', icon: 'television-play', title: 'Jogo' },
};

export default {
  Screen,
  Tab,
};
