export class Game {
  constructor() {
    this.id = '';
    this.created = new Date().toString();
    this.updated = new Date().toString();
    this.players = [];
  }
}

export default new Game();
