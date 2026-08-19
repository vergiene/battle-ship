export class Ship {
	constructor(name, size, positioning) {
		this._name = name;
		this._size = size;
		this._isVertical = positioning;
		this._startPosition = {
			x: 0,
			y: 0,
		};
		this._hits = new Array(size).fill(false);
	}

	get name() {
		return `${this._name}`;
	}

	set name(name) {
		this._name = name;
	}

	get size() {
		return this._size;
	}

	set size(size) {
		this._size = size;
	}

	get isVertical() {
		return this._isVertical;
	}

	set isVertical(isVertical) {
		this._isVertical = isVertical;
	}

	get hits() {
		return this._hits;
	}

	set hits(hits) {
		this._hits = hits;
	}

	get startPosition() {
		return this._startPosition;
	}

	set startPosition(startPosition) {
		this._startPosition = startPosition;
	}

	get x() {
		return this._startPosition.x;
	}

	set x(position) {
		this._startPosition.x = position;
	}

	get y() {
		return this._startPosition.y;
	}

	set y(position) {
		this._startPosition.y = position;
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
