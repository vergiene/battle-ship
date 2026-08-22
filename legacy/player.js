import {Ship} from "./ship.js";
import {Board} from "./board.js";

export class Player {
	constructor(name, boardSize) {
		this._name = name;
		this._boardSize = boardSize;
		this._board = new Board(boardSize);
	}
	get name() {
		return this._name;
	}
	get boardSize() {
		return this._boardSize;
	}
	set name(name) {
		this._name = name;
	}
	set boardSize(boardSize) {
		this._boardSize = boardSize;
	}

	placeShips(shipName, length, isVertical, startPosition) {
		let ship = new Ship(shipName, length, isVertical);
		ship._startPosition = startPosition;
		this._board.placeShip(ship._startPosition.x, ship._startPosition.y, ship);
	}
	async takeTurn(opponent) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		let input = prompt(`${this.name}, put opponent's ship coordinates (ex.: 1 1):`);
		let x = +input.split(' ')[0];
		let y = +input.split(' ')[1];
		return {opponent, x, y};
	}
}
