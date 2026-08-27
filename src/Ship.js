export class Ship {
	constructor(size, positioning) {
		this._size = size;
		this._isVertical = positioning;
		this._hits = new Array(size).fill(false);
	}

	get size() {
		return this._size;
	}

	get isVertical() {
		return this._isVertical;
	}

	hit(index) {
		if (index >= 0 && index < this.size) {
			this._hits[index] = true;
		}
		return this._hits[index];
	}

	isSunk() {
		return this._hits.every((hit) => hit === true);
	}
}
