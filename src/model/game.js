import { Player } from './player';

export class Game {
  constructor(game) {
    this.id = game ? game.id : new Date().getTime();
    this.created = game ? game.created : new Date().toString();
    this.updated = game ? game.updated : new Date().toString();
    this.players = [];
    if (game && game.players.length) {
      game.players.forEach((player) => {
        this.players.push(new Player(player));
      });
    }
  }
}

export default new Game();
