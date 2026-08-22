import {Player} from "./Player.js";

export class AIPlayer extends Player {
	takeTurn(opponent) {
		let x, y;
		let state = 'hit';
		while (state === 'hit' || state === 'miss') {
			x = Math.floor(Math.random() * this._board.size);
			y = Math.floor(Math.random() * this._board.size);
			state = this._board.getCellState(x, y);
		}

		return { x, y, opponent };
	}
}
