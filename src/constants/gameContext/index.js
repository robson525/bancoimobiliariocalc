import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Game } from '../../model/game';
import { Config } from '../../model/config';

export const GameContext = createContext({});

export const GameProvider = (props) => {
  // Initial values are obtained from the props
  const {
    games: initialGames,
    currentGame: initialCurrentGames,
    config: initialConfig,
    children,
  } = props;

  // Use State to keep the values
  const [games, setGames] = useState(initialGames);
  const [currentGame, setCurrentGame] = useState(initialCurrentGames);
  const [config, setConfig] = useState(initialConfig);

  const addGame = (game) => {
    setGames(games.concat([game]));
  };

  // Make the context object:
  const gameContext = {
    games,
    setGames,
    currentGame,
    setCurrentGame,
    addGame,
    config,
    setConfig,
  };

  // pass the value in provider and return
  return <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>;
};

export const { Consumer } = GameContext;

GameProvider.propTypes = {
  games: PropTypes.arrayOf(Game),
  currentGame: PropTypes.objectOf(Game),
  config: PropTypes.objectOf(Config),
};

GameProvider.defaultProps = {
  games: [],
  currentGame: {},
  config: {},
};
