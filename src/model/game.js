import general from '../constants/general';
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

  static Copy(game) {
    return new Game(JSON.parse(JSON.stringify(game)));
  }

  static CreateTest() {
    const game = new Game();
    game.players = [
      new Player({
        id: 1, name: 'Robson', amount: 2500, color: general.Color.options[0], icon: general.Icons.options[0],
      }),
      new Player({
        id: 2, name: 'Cibele', amount: 2500, color: general.Color.options[1], icon: general.Icons.options[0],
      }),
      new Player({
        id: 3, name: 'Maria', amount: 2500, color: general.Color.options[2], icon: general.Icons.options[0],
      }),
      new Player({
        id: 4, name: 'Carlito', amount: 2500, color: general.Color.options[3], icon: general.Icons.options[0],
      }),
      new Player({
        id: 5, name: 'Juliana', amount: 2500, color: general.Color.options[4], icon: general.Icons.options[0],
      }),
      new Player({
        id: 6, name: 'Matheus', amount: 2500, color: general.Color.options[5], icon: general.Icons.options[0],
      }),
    ];
    return JSON.stringify(game);
  }
}

export default new Game();
