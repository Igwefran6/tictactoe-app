// created a TicTacToe class
class TicTacToe {
    constructor() {
        this.currentPlayer = "X";
        this.board = this.initBoard();
        this.tie = false;
        this.win = false;
        this.initUI();
        this.winLoss = {
            playerXwins: 0,
            playerOwins: 0,
            ties: 0
        };
    }
    // instantiate 3x3/two dimensional board array
    initBoard() {
        return Array.from({ length: 3 }, () => Array(3).fill(" "));
    }

    initUI() {
        let refreshPage = document.querySelector(".refresh");
        let startGameBtn = document.querySelector(".start-game");
        let playAgainBtn = document.querySelector(".play-again");
        let gameBoard = document.querySelector(".gameboard");

        setState(playAgainBtn, "none", 0.5);
        setState(gameBoard, "none", 0.5);

        startGameBtn.addEventListener("click", () => {
            setState(gameBoard, "auto", 1);
            setState(playAgainBtn, "auto", 1);
            setState(startGameBtn, "none", 0.5);
        });

        playAgainBtn.addEventListener("click", () => {
            this.playAgain();
        });
        function setState(element, pointerEventsValue, opacity) {
            element.style.opacity = opacity;
            element.style.pointerEvents = pointerEventsValue;
        }
        refreshPage.addEventListener("click", () => {
            if (
                confirm(
                    `Do you really want to start a fresh game? \nNote: Every data will be lost?`
                )
            ) {
                location.reload();
            }
        });
    }

    playAgain() {
        this.board.forEach(row =>
            row.forEach((element, index) => {
                row[index] = " ";
            })
        );
        this.tie = false;
        this.win = false;
        this.updateUI();
        this.display(this.currentPlayer);
    }

    //make move method, the engine of the game
    move(row, col) {
        if (this.tie || this.win) return;
        if (this.isValidMove(row, col)) {
            this.makeMove(row, col);
            this.updateUI();

            if (this.checkWinner()) {
                this.displayBoard();
                console.log(`Player ${this.currentPlayer} wins!`);
                this.win = true;

                if (this.currentPlayer === "X") {
                    this.winLoss.playerXwins++;
                } else {
                    this.winLoss.playerOwins++;
                }
                this.winsAndLoss();
                this.switchPlayers();
                this.displayBoard();
                return;
            }

            if (this.isTie()) {
                this.displayBoard();
                console.log("It's a tie!");
                this.winLoss.ties++;
                this.tie = true;
                this.winsAndLoss();
            }
        } else {
            console.log("Cell already taken. Try again.");
        }
        this.switchPlayers();
        this.displayBoard();
    }
    /* console version that I commented out as told by odin project curriculum.
    To run this, add game.playGame() below the instance of TicTacToe 
    */
    /*playGame() {
        while (true) {
            this.displayBoard();
            let row = parseInt(prompt("Enter the row (0, 1, or 2):"));
            let col = parseInt(prompt("Enter the column (0, 1, or 2):"));

            if (this.isValidMove(row, col)) {
                this.makeMove(row, col);

                if (this.checkWinner()) {
                    this.displayBoard();
                console.log(`Player ${this.currentPlayer} wins!`);
                    break;
                }

                if (this.isTie()) {
                    this.displayBoard();
                    console.log("It's a tie!");
                    break;
                }

                this.switchPlayers();
            } else {
                console.log("Cell already taken. Try again.");
            }
        }
    }*/
    // displays board in console
    displayBoard() {
        console.log(
            this.board.map(row => row.join(" | ")).join("\n---------\n")
        );
    }

    isValidMove(row, col) {
        return this.board[row][col] === " ";
    }

    makeMove(row, col) {
        this.board[row][col] = this.currentPlayer;
    }
    // updating html gameBoard
    updateUI() {
        let boardIndex = -1;
        const board = document.querySelectorAll(".cell");
        const boardArr = this.board.flat();
        board.forEach(cell => {
            boardIndex++;
            cell.textContent = boardArr[boardIndex];
        });
    }

    checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (
                this.board[i][0] === this.board[i][1] &&
                this.board[i][1] === this.board[i][2] &&
                this.board[i][0] !== " "
            ) {
                return true; // Row winner
            }

            if (
                this.board[0][i] === this.board[1][i] &&
                this.board[1][i] === this.board[2][i] &&
                this.board[0][i] !== " "
            ) {
                return true; // Column winner
            }
        }

        if (
            (this.board[0][0] === this.board[1][1] &&
                this.board[1][1] === this.board[2][2]) ||
            (this.board[0][2] === this.board[1][1] &&
                this.board[1][1] === this.board[2][0])
        ) {
            if (this.board[1][1] !== " ") {
                return true; // Diagonal winner
            }
        }

        return false; // No winner
    }

    isTie() {
        return this.board.flat().every(cell => cell !== " ");
    }

    switchPlayers() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.display(this.currentPlayer);
    }

    display(currentPlayer) {
        let display = document.querySelector(".display");

        if (this.tie || this.win) {
            if (this.win) {
                let winner = currentPlayer === "X" ? "O" : "X";
                display.textContent = `Player ${winner} won this round`;
            } else {
                display.textContent = `It's a tie`;
            }
        } else {
            display.textContent = `Turn: Player ${currentPlayer}`;
        }
    }
    winsAndLoss() {
        document.querySelector(".x-wins").textContent = `X score:
      ${this.winLoss.playerXwins}`;
        document.querySelector(".o-wins").textContent = `O score:
      ${this.winLoss.playerOwins}`;
        document.querySelector(".ties").textContent = `Ties:
      ${this.winLoss.ties}`;
    }
}

// Create an instance of TicTacToe
const game = new TicTacToe();
let popUp = document.querySelector(".pop-up");

//
setTimeout(function () {
    popUp.style.display = "block";
    setTimeout(function () {
        popUp.style.display = "none";
    }, 4000);
}, 1000);
