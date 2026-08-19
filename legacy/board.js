import { Ship } from './ship.js';

export class Board {
	constructor(size) {
		this._size = size;

		this._grid = new Array(size).fill(null).map(()=>new Array(size).fill(null));

		this._ships = [];
	}

	get size() {
		return this._size;
	}

	set size(value) {
		this._size = value;
	}

	get grid() {
		return this._grid;
	}

	set grid(value) {
		this._grid = value;
	}

	get ships() {
		return this._ships;
	}

	set ships(value) {
		this._ships = value;
	}

	placeShip(ship, x, y) {
		ship._startPosition = {x, y};
		this._ships.push(ship);

		for (let i = 0; i < ship._size; i++) {
			if (ship._isVertical === 0) {
				this._grid[y][x + i] = {ship, index: i};
			} else {
				this._grid[y + i][x] = {ship, index: i};
			}
		}
	}

	findAvailableCells() {
		let result = [];
		for (let y = 0; y < this._size; y++) {
			for (let x = 0; x < this._size; x++) {
				if (this._grid[y][x] === null) {
					result.push({x, y});
				}
			}
		}

		return result;
	}

	receiveAttack(x, y) {
		let res = false;
		const target = this._grid[y][x];

		if (target !== null) {
			const ship = target.ship;
			const index = target.index;

			ship.hit(index);
			res = true;
		}

		return res;
	}

	display() {
		let boardCells = '';
		for (let y = 0; y < this._size; y++) {
			for (let x = 0; x < this._size; x++) {
				let cell = this._grid[y][x];
				if (cell === null) {
					boardCells += '~ ';
				} else if (cell.ship._hits[cell.index] === true) {
					boardCells += 'X ';
				} else {
					boardCells += 'S ';
				}
			}
			boardCells += '\n';
		}
		console.log(boardCells);
	}
}
