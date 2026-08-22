import {Player} from "./player.js";
import {Ship} from "./ship.js";

export class AIPlayer extends Player {
	constructor(name, boardSize) {
		super(name, boardSize);
		this._previousAttacks = [];
	}

	placeShips(length) {
		let name = 'AIShip' + Math.floor(Math.random() * 100);
		let isVertical = Math.floor(Math.random() * 2);
		let availableCells = this._board.findAvailableCells();

		if (availableCells.length > 0) {
			let ship = new Ship(name, length, isVertical);

			let maxX = this._boardSize - (isVertical === 0 ? length : 1);
			let maxY = this._boardSize - (isVertical === 1 ? length : 1);

			let x = Math.floor(Math.random() * maxX);
			let y = Math.floor(Math.random() * maxY);
			this._board.placeShip(ship, x, y);
		} else {
			console.log('No available cells found.');
		}
	}


	async takeTurn(opponent) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		let x, y;
		let notAttacked = false;

		while (!notAttacked) {
			x = Math.floor(Math.random() * (this._boardSize - 1));
			y = Math.floor(Math.random() * (this._boardSize - 1));

			notAttacked = !this._previousAttacks.some(match => match.x === x && match.y === y);
		}
		opponent._board.receiveAttack(x, y);
		this._previousAttacks.push({x, y});

		return { x, y, opponent };
	}
}
