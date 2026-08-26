import {Player} from "./Player.js";
import {Ship} from "./Ship.js";

export class AIPlayer extends Player {
	constructor(name, board) {
		super(name, board);
		this._queue = [];
	}

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

	takeTurn(container, board) {
		return new Promise((resolve) => {
			setTimeout(() => {
				let x, y;
				if (this._queue.length > 0) {
					x = this._queue[0][0];
					y = this._queue[0][1];
					this._queue.shift();
				} else {
					let state = 'hit';
					while (state === 'hit' || state === 'miss') {
						x = Math.floor(Math.random() * board.size);
						y = Math.floor(Math.random() * board.size);
						state = board.getCellState(x, y);
					}
				}
				resolve([x, y]);
			}, 1000);
		});
	}

	processResult(x, y, isHit, board) {
		if (isHit) {
			const ship = board.grid[y][x].ship;
			const isSunk = ship.isSunk();
			if (!isSunk) {
				const direction = [[0, 1], [0, -1], [1, 0], [-1, 0]];
				for (const [dy, dx] of direction) {
					const nx = x + dx;
					const ny = y + dy;
					if (nx < 0 || ny < 0 || nx >= board.size || ny >= board.size) {
						continue;
					}
					let type = board.getCellState(nx, ny);
					if (type === 'empty' || type === 'ship') {
						this._queue.push([nx, ny]);
					}
				}
			} else {
				this._queue = [];
			}
		}
	}
}
