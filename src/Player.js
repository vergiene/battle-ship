import {Ship} from "./Ship.js";

export class Player {
	constructor(name, board) {
		this._name = name;
		this._board = board;
	}

	get name() {
		return this._name;
	}

	get board() {
		return this._board;
	}

	setCells(cells) {
		this._cells = cells;
	}

	get cells() {
		return this._cells;
	}

	placeShip(size) {
		let flag = false;
		while (!flag) {
			let isVertical = Math.random() > 0.5;
			let ship = new Ship(size, isVertical);
			let x = Math.floor(Math.random() * this._board.size);
			let y = Math.floor(Math.random() * this._board.size);
			flag = this._board.placeShips(x, y, ship);
		}
	}
}
