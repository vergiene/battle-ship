import {Player} from "./player.js";

export class HumanPlayer extends Player {
	constructor(name, boardSize) {
		super(name, boardSize);
	}
	placeShips(shipName, length, isVertical, startPosition) {
		super.placeShips(shipName, length, isVertical, startPosition);
	}
	async takeTurn(opponent) {
		return super.takeTurn(opponent);
	}
}
