export class Board {
	constructor(size = 10) {
		this._size = size;
		this._ships = [];
		this._grid = Array(size).fill(null).map(() => new Array(size).fill(null));
	}

	get size() {
		return this._size;
	}

	get ships() {
		return this._ships;
	}

	get grid() {
		return this._grid; // for render?
	}

	canPlaceShip(startX, startY, ship) {
		if (ship.isVertical && startY + ship.size > 10) return false;
		if (!ship.isVertical && startX + ship.size > 10) return false;

		const result = [];
		let flag = true;

		for (let i = 0; i < ship.size && flag; i++) {
			const x = ship.isVertical ? startX : startX + i;
			const y = ship.isVertical ? startY + i : startY;
			if (this._grid[y][x] === null) {
				result.push([x, y]);
				continue;
			}
				flag = false;
		}

		return flag ? result : null;
	}

	placeShips(x, y, ship) {
		let validCells = this.canPlaceShip(x, y, ship);
		if (validCells === null) return false;
		this._ships.push(ship);

		for (let i = 0; i < validCells.length; i++) {
			let [x, y] = validCells[i];
			this._grid[y][x] = {ship, index: i, type: 'ship'};
		}

		return true;
	}

	receiveAttack(x, y) {
		let cell = this._grid[y][x];
		if (cell === null) {
			this._grid[y][x] = {type: 'miss'};
			return false;
		} else {
			const ship = cell.ship;
			const index = cell.index;
			ship.hit(index);
			this._grid[y][x] = {...cell, type: 'hit'};
			return true;
		}
	}

	getCellState(x, y) {
		let cell = this._grid[y][x];
		if (cell === null) {
			return 'empty';
		} else {
			return cell.type;
		}
	}
}
