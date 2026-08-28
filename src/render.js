export function createBoard(board, container) {
	container.innerHTML = '';
	const cellArray = [];
	for (let i = 0; i < board.size; i++) {
		for (let j = 0; j < board.size; j++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			cell.dataset.x = String(j);
			cell.dataset.y = String(i);
			container.appendChild(cell);
			cellArray.push(cell);
		}
	}
	return cellArray;
}

export function renderBoard(board, cells, isShipHidden) {
	for (let i = 0; i < board.size; i++) {
		for (let j = 0; j < board.size; j++) {
			const boardCell = board.grid[i][j];
			const type = board.getCellState(j, i);
			const index = (board.size * i) + j;
			if (type === 'ship') {
				if (isShipHidden) {
					cells[index].className = `cell hidden`;
					continue;
				}
				renderShipSegment(boardCell, cells[index]);
				continue;
			} else if (type === 'hit') {
				if (boardCell.ship.isSunk()) {
					cells[index].className = `cell sunk`;
					continue;
				}
				cells[index].className = 'cell hit';
				continue;
			}
			cells[index].className = `cell ${type}`;
		}
	}
}

export function renderShipSegment(boardCell, cell) {
	const { isVertical, size } = boardCell.ship;
	const index = boardCell.index;

	let role;
	if (size === 1) {
		role = 'single-deck';
	} else if (index === 0) {
		role = `bow_${isVertical ? 'v' : 'h'}`;
	} else if (index === size - 1) {
		role = `tail_${isVertical ? 'v' : 'h'}`;
	} else {
		role = `mid_${isVertical ? 'v' : 'h'}`;
	}

	cell.className = `cell ship__${role}`;
}