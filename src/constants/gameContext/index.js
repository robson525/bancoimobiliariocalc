import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
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

  // Use State to keep the values
  const [currentGame, setCurrentGame] = useState(initialCurrentGames);
  const [config, setConfig] = useState(initialConfig);

  // Make the context object:
  const gameContext = {
    currentGame,
    setCurrentGame,
    config,
    setConfig,
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
