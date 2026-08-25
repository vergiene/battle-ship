import {Player} from "./Player.js";

export class HumanPlayer extends Player {
	placeShip(size) {
		// TODO build click logic for placement
	}

	takeTurn() {
		// TODO change prompt to click logic and disable already-attacked cells
		let input = prompt(`${this.name}, put opponent's ship coordinates (ex.: 1 1):`);
		let x = +input.split(' ')[0];
		let y = +input.split(' ')[1];

		return [x, y];
	}
}
