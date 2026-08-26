import {Player} from "./Player.js";
import {Ship} from "./Ship.js";

export class AIPlayer extends Player {
	placeShip(size) {
		return new Promise((resolve) => {
			let flag = false;
			while (!flag) {
				let isVertical = Math.random() > 0.5;
				let ship = new Ship(size, isVertical);
				let x = Math.floor(Math.random() * this._board.size);
				let y = Math.floor(Math.random() * this._board.size);
				flag = this._board.placeShips(x, y, ship);
			}
			resolve();
		});
	}

	takeTurn() {
		return new Promise((resolve) => {
			setTimeout(() => {
				let x, y;
				let state = 'hit';
				while (state === 'hit' || state === 'miss') {
					x = Math.floor(Math.random() * this._board.size);
					y = Math.floor(Math.random() * this._board.size);
					state = this._board.getCellState(x, y);
				}
				resolve([x, y]);
			}, 1000);
		});
	}
}
