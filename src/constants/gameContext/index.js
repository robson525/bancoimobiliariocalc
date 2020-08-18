import React, { createContext, useState } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import general from '../general';
import { Game } from '../../model/game';
import { Config } from '../../model/config';

export const GameContext = createContext({});

export const GameProvider = (props) => {
  // Initial values are obtained from the props
  const {
    currentGame: initialCurrentGames,
    config: initialConfig,
    children,
  } = props;

  const [currentGame, setCurrentGameState] = useState(initialCurrentGames);
  const [config, setConfigState] = useState(initialConfig);

  const setCurrentGameStore = async (nGame) => {
    await AsyncStorage.setItem(general.Storage.Game, JSON.stringify(nGame));
  };
  const setConfigStore = async (nConfig) => {
    await AsyncStorage.setItem(general.Storage.Config, JSON.stringify(nConfig));
  };

  const setCurrentGame = (nGame) => {
    setCurrentGameState(nGame);
    setCurrentGameStore(nGame);
  };
  const setConfig = (nConfig) => {
    setConfigState(nConfig);
    setConfigStore(nConfig);
  };

  const setStartState = (nGame, nConfig) => {
    setCurrentGameState(nGame);
    setConfigState(nConfig);
  };

  // Make the context object:
  const gameContext = {
    currentGame,
    setCurrentGame,
    config,
    setConfig,
    setStartState,
  };

  // pass the value in provider and return
  return <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>;
};

export const { Consumer } = GameContext;

GameProvider.propTypes = {
  currentGame: PropTypes.instanceOf(Game),
  config: PropTypes.instanceOf(Config),
};

GameProvider.defaultProps = {
  currentGame: new Game(),
  config: new Config(),
};
