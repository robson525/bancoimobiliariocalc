export class Config {
  constructor(config) {
    this.confirmActions = config ? config.confirmActions : true;
    this.initialAmount = config ? config.initialAmount : 2500;
  }
}

export default new Config();
