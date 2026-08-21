import {Player} from "./Player.js";

export class HumanPlayer extends Player {
	constructor(name, board) {
		super(name, board);
	}

	takeTurn(opponent) {
		// TODO change prompt to click-logic
		let input = prompt(`${this.name}, put opponent's ship coordinates (ex.: 1 1):`);
		let x = +input.split(' ')[0];
		let y = +input.split(' ')[1];
		return {opponent, x, y};
	}
}
