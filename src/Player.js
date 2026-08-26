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

	setContainer(container) {
		this._container = container;
	}

	get container() {
		return this._container;
	}
}
