export function createBoard(board, container) {
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
			let type = board.getCellState(j, i);
			let index = (board.size * i) + j;
			if (type === 'ship' && isShipHidden) {
				cells[index].className = `cell hidden`;
				continue;
			}
			cells[index].className = `cell ${type}`;
		}
	}
}