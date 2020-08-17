import PropTypes from 'prop-types';
import general from '../constants/general';

export class Player {
  constructor(player) {
    this.id = player ? player.id : 0;
    this.name = player ? player.name : '';
    this.amount = player ? player.amount : 0;
    this.color = player ? player.color : general.Color.default;
    this.icon = player ? player.icon : general.Icons.default;
  }
}

export default new Player();

Player.propTypes = {
  player: PropTypes.instanceOf(Player),
};
