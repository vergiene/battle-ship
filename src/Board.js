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

	canPlaceShip(startX, startY, ship) {
		if (ship.isVertical && startY + ship.size > this._size) return null;
		if (!ship.isVertical && startX + ship.size > this._size) return null;
		const result = [];
		for (let i = 0; i < ship.size; i++) {
			const x = ship.isVertical ? startX : startX + i;
			const y = ship.isVertical ? startY + i : startY;
			if (this._grid[y][x] !== null || !this.isThereNeighbor(x, y)) {
				return null;
			}
			result.push([x, y]);
		}
		return result;
	}

	isThereNeighbor(x, y) {
		for (let offsetY = -1; offsetY <= 1; offsetY++) {
			for (let offsetX = -1; offsetX <= 1; offsetX++) {
				const neighborX = x + offsetX;
				const neighborY = y + offsetY;
				if (
					neighborX >= 0 &&
					neighborX < this._size &&
					neighborY >= 0 &&
					neighborY < this._size &&
					this._grid[neighborY][neighborX] !== null
				) {
					return false;
				}
			}
		}
		return true;
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
		let type = this.getCellState(x, y);
		if (type === 'empty') {
			this._grid[y][x] = {type: 'miss'};
			return false;
		} else if (type === 'ship') {
			const ship = cell.ship;
			const index = cell.index;
			ship.hit(index);
			this._grid[y][x] = {...cell, type: 'hit'};
			return true;
		} else {
			return false;
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
