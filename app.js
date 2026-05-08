const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart");

let currentPlayer = "X";
let gameOver = false;

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add click event to every cell
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {

    // Stop if game ended
    if (gameOver) return;

    // Stop if cell already filled
    if (this.innerText !== "") return;

    // Put X or O
    this.innerText = currentPlayer;

    // Check winner
    if (checkWinner()) {
        setTimeout(() => {
            alert(currentPlayer + " Wins!");
        }, 100);

        gameOver = true;
        return;
    }

    // Check draw
    if (checkDraw()) {
        setTimeout(() => {
            alert("Match Draw!");
        }, 100);

        gameOver = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {

    for (let pattern of winPatterns) {

        let a = cells[pattern[0]].innerText;
        let b = cells[pattern[1]].innerText;
        let c = cells[pattern[2]].innerText;

        if (a !== "" && a === b && b === c) {

            // Highlight winning cells
            cells[pattern[0]].style.backgroundColor = "lightgreen";
            cells[pattern[1]].style.backgroundColor = "lightgreen";
            cells[pattern[2]].style.backgroundColor = "lightgreen";

            return true;
        }
    }

    return false;
}

function checkDraw() {

    for (let cell of cells) {
        if (cell.innerText === "") {
            return false;
        }
    }

    return true;
}

// Restart game
restartBtn.addEventListener("click", restartGame);

function restartGame() {

    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "#f2f2f2";
    });

    currentPlayer = "X";
    gameOver = false;
}