import PropTypes from 'prop-types';

export class Player {
  constructor(name, amout) {
    this.name = name;
    this.amout = amout ?? 0;
  }
}

export default new Player();

Player.propTypes = {
  name: PropTypes.string,
  amout: PropTypes.number,
};
