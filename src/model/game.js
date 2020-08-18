export class Game {
  constructor(game) {
    this.id = game ? game.id : new Date().getTime();
    this.created = game ? game.created : new Date().toString();
    this.updated = game ? game.updated : new Date().toString();
    this.players = game ? game.players : [];
  }
}

export default new Game();
