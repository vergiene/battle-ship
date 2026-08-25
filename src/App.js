import { Board } from "./Board.js";
import { HumanPlayer } from "./humanPlayer.js";
import { AIPlayer } from "./AIPlayer.js";
import {createBoard, renderBoard} from "./render.js";

export class App {
	constructor(name) {
		this._name = name;
	}

	gameSetup() {
		this._firstPlayer = new HumanPlayer(this._name, new Board());
		const container = document.getElementById('human-board');
		this._firstPlayer.setCells(createBoard(this._firstPlayer.board, container));
		this._secondPlayer = new AIPlayer('Robot', new Board());
		const AIContainer = document.getElementById('robot-board');
		this._secondPlayer.setCells(createBoard(this._secondPlayer.board, AIContainer));
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
		renderBoard(this._firstPlayer.board, this._firstPlayer.cells, false);
		this.shipPlacement(this._secondPlayer);
		renderBoard(this._secondPlayer.board, this._secondPlayer.cells, true);
		this.gameLoop();
	}

	gameLoop() {
		let currentPlayer = this._firstPlayer;
		let isGameEnd = false;
		while(!isGameEnd) {
			let opponent = currentPlayer === this._firstPlayer ? this._secondPlayer : this._firstPlayer;
			let [x, y] = currentPlayer.takeTurn();
			opponent.board.receiveAttack(x, y);
			const isShipHidden = opponent === this._secondPlayer;
			renderBoard(opponent.board, opponent.cells, isShipHidden);
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