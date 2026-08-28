import {Player} from "./Player.js";
import {Ship} from "./Ship.js";

export class HumanPlayer extends Player {
	placeShip(size) {
		return new Promise((resolve) => {
			let messageContainer = document.getElementById('message');
			messageContainer.textContent = `Place your ${size}-deck ship. Use SPACE to rotate`;
			let isVertical = Math.random() > 0.5;
			let lastX = null;
			let lastY = null;

			const container = document.getElementById('human-board');
			const clearPreview = () => {
				this._cells.forEach(cell => cell.classList.remove('preview'));
				this._cells.forEach(cell => cell.classList.remove('preview-bad'));
			};

			const updatePreview = (x, y) => {
				const ship = new Ship(size, isVertical);
				let candidate = this._board.getCandidate(x, y, ship);
				let isValid = this._board.canPlaceShip(x, y, ship);
				clearPreview();
				if (isValid) {
					for (const [cellX, cellY] of candidate) {
						const index = this._board.size * cellY + cellX;
						this._cells[index].classList.add('preview');
					}
				} else {
					for (const [cellX, cellY] of candidate) {
						const index = this._board.size * cellY + cellX;
						this._cells[index].classList.add('preview-bad');
					}
				}
			};

			const handleKeydown = event => {
				if (event.code === 'Space') {
					event.preventDefault();
					isVertical = !isVertical;
					if (lastX !== null && lastY !== null) {
						updatePreview(lastX, lastY);
					}
				}
			}

			const handleMouseOver = (event) => {
				if (!event.target.dataset.x) return;
				lastX = Number(event.target.dataset.x);
				lastY = Number(event.target.dataset.y);
				updatePreview(lastX, lastY);
			};

			const handleClick = event => {
				if (!event.target.dataset.x) return;
				const ship = new Ship(size, isVertical);
				const x = Number(event.target.dataset.x);
				const y = Number(event.target.dataset.y);
				const placed = this._board.placeShips(x, y, ship);
				if (placed) {
					clearPreview();
					container.removeEventListener('click', handleClick);
					container.removeEventListener('mouseover', handleMouseOver);
					document.removeEventListener('keydown', handleKeydown);
					resolve();
				}
			};
			container.addEventListener('click', handleClick);
			container.addEventListener('mouseover', handleMouseOver);
			document.addEventListener('keydown', handleKeydown);
		});
	}

	takeTurn(container, board) {
		return new Promise((resolve) => {
			const handleClick = event => {
				if (!event.target.dataset.x) return;
				const x = Number(event.target.dataset.x);
				const y = Number(event.target.dataset.y);
				const type = board.getCellState(x, y);
				if (type === 'ship' || type === 'empty') {
					container.removeEventListener('click', handleClick);
					resolve([x, y]);
				}
			}
			container.addEventListener('click', handleClick);
		});
	}
}
