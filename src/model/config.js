import PropTypes from 'prop-types';

export class Config {
  constructor(initialAmount) {
    this.initialAmount = initialAmount ?? 2500;
  }
}

export default new Config();

Config.propTypes = {
  initialAmount: PropTypes.number,
};
