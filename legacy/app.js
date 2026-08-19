import {Player} from "./player.js";
import {HumanPlayer} from "./humanPlayer.js";
import {AIPlayer} from "./AIPlayer.js";

class App {
	firstPlayer = null;
	secondPlayer = null;

	constructor(boardSize, maxShipLength, shipCount) {
		this._boardSize = boardSize;
		this._maxShipLength = maxShipLength;
		this._shipCount = shipCount;
	}

	get boardSize() {
		return this._boardSize;
	}
	get maxShipLength() {
		return this._maxShipLength;
	}
	get shipCount() {
		return this._shipCount;
	}
	set boardSize(boardSize) {
		this._boardSize = boardSize;
	}
	set maxShipLength(maxShipLength) {
		this._maxShipLength = maxShipLength;
	}
	set shipCount(shipCount) {
		this._shipCount = shipCount;
	}

	shipArrangement(player, shipCount, maxShipLength) {
			if (player instanceof HumanPlayer) {
				for (let i = 0; i < shipCount; i++) {
					let input = prompt(`Please, enter a name of ship, it's length (less or equal to ${maxShipLength}),, 
				start position (for ex.: 0, 0) and orientation (0 for horizontal and 1 for vertical).
				All data is entered separated by commas.`, 'Ship, 3, 0, 0, 0');
					let name = input.split(',')[0];
					let length = +input.split(',')[1];
					let posX = +input.split(',')[2];
					let posY = +input.split(',')[3];
					let orientation = +input.split(',')[4];
					let startPos = {x: posX, y: posY};
					player.placeShips(name, length, orientation, startPos);
				}
			} else {
				while (shipCount > 0) {
					let ranLength = Math.floor(Math.random() * maxShipLength) + 1;
					player.placeShips(ranLength);
					shipCount--;
				}
			}
	}

	run() {
		let choice = +prompt(`Do you wanna play with AI? (1 - yes, 0 - no)`);
		let firstName = prompt(`Please enter a name of first player`, 'Max');
		this.firstPlayer = new HumanPlayer(firstName, this._boardSize);
		this.shipArrangement(this.firstPlayer, this._shipCount, this._maxShipLength);
		this.firstPlayer._board.display();
		if (choice === 0) {
			let secondName = prompt(`Please enter a name of second player`, 'Alex');
			this.secondPlayer = new HumanPlayer(secondName, this._boardSize);
			this.shipArrangement(this.secondPlayer, this._shipCount, this._maxShipLength);
			this.secondPlayer._board.display();
		} else {
			this.secondPlayer = new AIPlayer('Robot', this._boardSize);
			this.shipArrangement(this.secondPlayer, this._shipCount, this._maxShipLength);
			this.secondPlayer._board.display();
		}

		let currentPlayer = this.firstPlayer;
		let isAllSunk = false;
		const gameLoop = async () => {
			if (isAllSunk) return;

			const {opponent, x, y} = await currentPlayer.takeTurn(currentPlayer === this.firstPlayer
				? this.secondPlayer
				: this.firstPlayer
			);

			console.log(currentPlayer.name, x, y);

			const attackState = opponent._board.receiveAttack(x, y);
			if (attackState) {
				console.log(`${currentPlayer.name}, nice shot! You hit the opponent's ship!`);
				opponent._board.display();
				const isSunk = opponent._board.ships.every((ship) => ship.isSunk());

				if (isSunk) {
					console.log(`The winner is ${currentPlayer.name}! Congrats!`);
					isAllSunk = true;
				}
			} else {
				console.log(`${currentPlayer.name}, aim better next time!`);
				opponent._board.display();
			}

			if (!isAllSunk) {
				currentPlayer =
					currentPlayer === this.firstPlayer
						? this.secondPlayer
						: this.firstPlayer;
				setTimeout(gameLoop, 1000);
			}
		}
		gameLoop();
	}


}

let app = new App(5, 3, 1);
app.run();
