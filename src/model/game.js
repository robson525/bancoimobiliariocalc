import PropTypes from 'prop-types';
import { Player } from './player';

export class Game {
  constructor(players) {
    this.id = new Date().getTime();
    this.created = new Date().toString();
    this.updated = new Date().toString();
    this.players = players ?? [];
    this.finished = false;
  }
}

export default new Game();

Game.propTypes = {
  players: PropTypes.PropTypes.arrayOf(Player),
};
