const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const PLAYER_X = "X";
const PLAYER_O = "O";

let options = Array(9).fill("");
let currentPlayer = PLAYER_X;
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.dataset.cellIndex;

    if (options[cellIndex] !== "" || !running) return;

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            statusText.textContent = `${currentPlayer} wins!`;
            running = false;
            highlightCells([a, b, c]);
            return;
        }
    }

    if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function highlightCells(indices) {
    indices.forEach(i => cells[i].classList.add("winner"));
}

function restartGame() {
    currentPlayer = PLAYER_X;
    options = Array(9).fill("");
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
}
