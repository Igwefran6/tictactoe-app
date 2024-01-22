class TicTacToe {
    constructor() {
        this.currentPlayer = "X";
        this.board = this.initBoard();
    }

    initBoard() {
        return Array.from({ length: 3 }, () => Array(3).fill(" "));
    }

    playGame() {
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
    }

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
    }
}

// Create an instance of TicTacToe and run the game
const game = new TicTacToe();
game.playGame();
