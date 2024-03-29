document.addEventListener("DOMContentLoaded", () => {
	const startBtn = document.querySelector(".btn")
	const scoreInput = document.querySelector("#input-score")
	const scoreForm = document.querySelector("#submit-score")
	const scoreDisplay = document.getElementById("score")

	let pacmanCurrentIndex = 490;
	let score = 0;
	const width = 28;
	const grid = document.querySelector(".grid");
    const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
	// 0 - pac-dots
	// 1 - wall
	// 2 - ghost-lair
	// 3 - power-pellet
	// 4 - empty

	const squares = [];

	function createBoard() {
		for (let i = 0; i < layout.length; i++) {
			const square = document.createElement("div");
			grid.appendChild(square);
			squares.push(square);

			//add layout to the board
			if (layout[i] === 0) {
				squares[i].classList.add("pac-dot");
			} else if (layout[i] === 1) {
				squares[i].classList.add("wall");
			} else if (layout[i] === 2) {
				squares[i].classList.add("ghost-lair");
			} else if (layout[i] === 3) {
				squares[i].classList.add("power-pellet");
			} else {
				squares[i].classList.add("empty");
			}
		}
	}
	createBoard();

	//create ghosts
	class Ghost {
		constructor(className, startIndex, speed) {
			this.className = className;
			this.startIndex = startIndex;
			this.speed = speed;
			this.currentIndex = startIndex;
			this.isScared = false;
			this.timerId = NaN;
		}
	}

	//all ghosts
	ghosts = [new Ghost("blinky", 348, 250), new Ghost("pinky", 376, 400), new Ghost("inky", 351, 300), new Ghost("clyde", 379, 500)];

	//start and restart
	function startGame() {
		// remove previous characters
		squares[pacmanCurrentIndex].classList.remove("pac-man")

		ghosts.forEach((ghost) => clearInterval(ghost.timerId));
		ghosts.forEach((ghost) => {
			squares[ghost.currentIndex].classList.remove(ghost.className);
			squares[ghost.currentIndex].classList.remove("ghost");
		});

		//draw pacman
		pacmanCurrentIndex = 490;
		squares[pacmanCurrentIndex].classList.add("pac-man");

		//draw ghosts
		ghosts.forEach((ghost) => {
			ghost.currentIndex = ghost.startIndex;
		})
		ghosts.forEach((ghost) => {
			squares[ghost.currentIndex].classList.add(ghost.className);
			squares[ghost.currentIndex].classList.add("ghost");
		})

		//move the Ghosts randomly
		ghosts.forEach((ghost) => moveGhost(ghost));
	}

	//move pacman
	function movePacman(e) {
		squares[pacmanCurrentIndex].classList.remove("pac-man");
		switch (e.keyCode) {
			case 37: // left
                if (pacmanCurrentIndex % width !== 0 && // left border
                    !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
                )
                    pacmanCurrentIndex -= 1;
				if (squares[pacmanCurrentIndex - 1] === squares[363]) {
					pacmanCurrentIndex = 391;
				}
				break;
			case 38: // up
				if (pacmanCurrentIndex - width >= 0 && // top border
					!squares[pacmanCurrentIndex - width].classList.contains("wall") &&
					!squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
				)
					pacmanCurrentIndex -= width;
				break;
			case 39: // right
				if (
					pacmanCurrentIndex % width < width - 1 && // right border
					!squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
					!squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
				)
					pacmanCurrentIndex += 1;
				if (squares[pacmanCurrentIndex + 1] === squares[392]) {
					pacmanCurrentIndex = 364;
				}
				break;
			case 40: // down
				if (
					pacmanCurrentIndex + width < width * width && // bottom border
					!squares[pacmanCurrentIndex + width].classList.contains("wall") &&
					!squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
				)
					pacmanCurrentIndex += width;
				break;
		}
		squares[pacmanCurrentIndex].classList.add("pac-man");
		pacDotEaten();
		powerPelletEaten();
		checkForGameOver();
		checkForWin();
	}
	document.addEventListener("keydown", movePacman);

	// what happens when you eat a pac-dot
	function pacDotEaten() {
		if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
			score += 10;
			scoreDisplay.innerHTML = score;
			squares[pacmanCurrentIndex].classList.remove("pac-dot");
		}
	}

	//what happens when you eat a power-pellet
	function powerPelletEaten() {
		if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
			score += 50;
			ghosts.forEach((ghost) => (ghost.isScared = true));
			setTimeout(unScareGhosts, 10000);
			squares[pacmanCurrentIndex].classList.remove("power-pellet");
		}
	}

	//make the ghosts stop flashing
	function unScareGhosts() {
		ghosts.forEach((ghost) => (ghost.isScared = false));
	}

	function moveGhost(ghost) {
		const directions = [-1, +1, width, -width];
		let direction = directions[Math.floor(Math.random() * directions.length)];

		ghost.timerId = setInterval(function () {
			if (
				!squares[ghost.currentIndex + direction].classList.contains("ghost") &&
				!squares[ghost.currentIndex + direction].classList.contains("wall")
			) {
				squares[ghost.currentIndex].classList.remove(ghost.className);
				squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
				ghost.currentIndex += direction;
				squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
			} else direction = directions[Math.floor(Math.random() * directions.length)];

			if (ghost.isScared) {
				squares[ghost.currentIndex].classList.add("scared-ghost");
			}

			if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
				squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
				ghost.currentIndex = ghost.startIndex;
				score += 100;
				squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
			}
			checkForGameOver();
		}, ghost.speed);
	}

	//check for a game over
	function checkForGameOver() {
		if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
			ghosts.forEach((ghost) => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", movePacman);
			scoreInput.value = score;
			setTimeout(function () {
				alert("Game Over. \nYou LOST!");
				scoreForm.submit();
			}, 500);
		}
	}

	//check for a win - more is when this score is reached
	function checkForWin() {
		if (score === 2740) {
			ghosts.forEach((ghost) => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", movePacman);
			scoreInput.value = score;
			setTimeout(function () {
				alert("You WON!");
				scoreForm.submit();
			}, 500);
		}
	}

	startBtn.addEventListener("click", startGame);
});
