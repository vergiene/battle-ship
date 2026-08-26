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
		this._firstPlayer.setContainer(document.getElementById('human-board'));
		this._firstPlayer.setCells(createBoard(this._firstPlayer.board, this._firstPlayer.container));
		this._secondPlayer = new AIPlayer('Robot', new Board());
		this._secondPlayer.setContainer(document.getElementById('robot-board'));
		this._secondPlayer.setCells(createBoard(this._secondPlayer.board, this._secondPlayer.container));
	}

	async shipPlacement(player, isHidden) {
		const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		for (const size of shipSizes) {
			await player.placeShip(size);
			renderBoard(player.board, player.cells, isHidden);
		}
	}

	async run() {
		this.gameSetup();
		await this.shipPlacement(this._firstPlayer, false);
		await this.shipPlacement(this._secondPlayer, true);
		await this.gameLoop();
	}

	async gameLoop() {
		let currentPlayer = this._firstPlayer;
		let isGameEnd = false;
		while(!isGameEnd) {
			let opponent = currentPlayer === this._firstPlayer ? this._secondPlayer : this._firstPlayer;
			const isAI = opponent === this._secondPlayer;
			let [x, y] = await currentPlayer.takeTurn(opponent.container, opponent.board);
			const isHit = opponent.board.receiveAttack(x, y);
			if (!isAI) {
				currentPlayer.processResult(x, y, isHit, opponent.board);
			}
			renderBoard(opponent.board, opponent.cells, isAI);
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