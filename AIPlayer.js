import {Player} from "./Player.js";

export class AIPlayer extends Player {
	constructor(name, board) {
		super(name, board);
		this._previousAttacks = [];
	}

	takeTurn(opponent) {
		let x, y;
		let notAttacked = false;

		while (!notAttacked) {
			x = Math.floor(Math.random() * this._board.size);
			y = Math.floor(Math.random() * this._board.size);

			notAttacked = !this._previousAttacks.some(match => match.x === x && match.y === y);
		}
		this._previousAttacks.push({x, y});

		return { x, y, opponent };
	}
}
