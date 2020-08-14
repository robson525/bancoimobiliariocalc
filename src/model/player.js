import PropTypes from 'prop-types';

export class Player {
  constructor(id, name, amount) {
    this.id = id ?? 0;
    this.name = name;
    this.amount = amount ?? 0;
  }
}

export default new Player();

Player.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
};
