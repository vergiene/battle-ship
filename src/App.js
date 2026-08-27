import { Board } from "./Board.js";
import { HumanPlayer } from "./humanPlayer.js";
import { AIPlayer } from "./AIPlayer.js";
import {createBoard, renderBoard} from "./render.js";

export class App {
	constructor() {
		this._name = '';
	}

	gameSetup() {
		this._firstPlayer = new HumanPlayer(this._name, new Board());
		this._firstPlayer.setContainer(document.getElementById('human-board'));
		this._firstPlayer.setCells(createBoard(this._firstPlayer.board, this._firstPlayer.container));
		this._secondPlayer = new AIPlayer('Robot', new Board());
		this._secondPlayer.setContainer(document.getElementById('robot-board'));
		this._secondPlayer.setCells(createBoard(this._secondPlayer.board, this._secondPlayer.container));
	}

	async shipPlacement(player, isHidden) {
		const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		for (const size of shipSizes) {
			await player.placeShip(size);
			renderBoard(player.board, player.cells, isHidden);
		}
	}

	getUserName() {
		return new Promise((resolve) => {
			const container = document.getElementById('name');
			const button = document.getElementById('name-button');
			const input = document.getElementById('name-input');
			const submitName = () => {
				const name = input.value.trim() || 'Player';
				container.classList.add('get__name__banner-hidden');
				resolve(name);
			};

			button.addEventListener('click', submitName);
			input.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					submitName();
				}
			});

			container.classList.remove('get__name__banner-hidden');
		});
	}

	async run() {
		if (this._name === '') {
			this._name = await this.getUserName();
		}
		this.gameSetup();
		await this.shipPlacement(this._firstPlayer, false);
		await this.shipPlacement(this._secondPlayer, true);
		await this.gameLoop();
	}

	async gameLoop() {
		let currentPlayer = this._firstPlayer;
		let isGameEnd = false;
		while (!isGameEnd) {
			let opponent = currentPlayer === this._firstPlayer ? this._secondPlayer : this._firstPlayer;
			const isAI = opponent === this._secondPlayer;
			let [x, y] = await currentPlayer.takeTurn(opponent.container, opponent.board);
			const isHit = opponent.board.receiveAttack(x, y);
			if (!isAI) {
				currentPlayer.processResult(x, y, isHit, opponent.board);
			}
			renderBoard(opponent.board, opponent.cells, isAI);
			isGameEnd = opponent.board.ships.every(ship => ship.isSunk());
			if (!isGameEnd) {
				currentPlayer = opponent;
			}
		}
		this.showWinner(currentPlayer.name);
	}

	showWinner(winner) {
		const container = document.getElementById('banner');
		const text = document.getElementById('banner__text');
		const button = document.getElementById('banner__button');
		text.textContent = `${winner} is the winner! Congrats! 🎉`;
		const handleClick = () => {
			container.classList.add('winner__banner-hidden');
			this.run().catch((err) => {
				console.error('Failed to start new game:', err);
			});
			button.removeEventListener('click', handleClick);
		}
		container.classList.remove('winner__banner-hidden');
		button.addEventListener('click', handleClick);
	}
}

// for debug
let app = new App();
app.run().catch((err) => {console.error('Failed to run App', err)});