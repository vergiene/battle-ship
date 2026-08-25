import { Board } from "./Board.js";
import { HumanPlayer } from "./humanPlayer.js";
import { AIPlayer } from "./AIPlayer.js";

export class App {
	constructor(name) {
		this._name = name;
	}

	gameSetup() {
		this._firstPlayer = new HumanPlayer(this._name, new Board());
		this._secondPlayer = new AIPlayer('Robot', new Board());
	}

	shipPlacement(player) {
		const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		for (const size of shipSizes) {
			player.placeShip(size);
		}
	}

	run() {
		this.gameSetup();
		this.shipPlacement(this._firstPlayer);
		// for debug
		this._firstPlayer.board.display();
		this.shipPlacement(this._secondPlayer);
		// for debug
		this._secondPlayer.board.display();
		this.gameLoop();
	}

	gameLoop() {
		let currentPlayer = this._firstPlayer;
		let isGameEnd = false;
		while(!isGameEnd) {
			let opponent = currentPlayer === this._firstPlayer ? this._secondPlayer : this._firstPlayer;
			let [x, y] = currentPlayer.takeTurn();
			let isHit = opponent.board.receiveAttack(x, y);
			// for debug
			if (isHit) {
				console.log("Hit");
			} else {
				console.log("Miss");
			}
			opponent.board.display();
			isGameEnd = opponent.board.ships.every(ship => ship.isSunk());
			if (!isGameEnd) {
				currentPlayer = opponent;
			}
		}
		// TODO replace with the DOM banner
		console.log(`${currentPlayer.name} wins!`);
	}
}

// for debug
let app = new App('Max');
app.run();