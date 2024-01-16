class GameBoard {
    constructor(rows, columns, player1, player2) {
        this.rows = rows;
        this.columns = columns;
        this.player1 = player1;
        this.player2 = player2;
        this.board = this.createEmptyGameBoard;
    }

    createEmptyGameBoard() {
        return Array.from({ length: this.rows }, () =>
            Array(this.columns).fill(null)
        );
    }

    displayBoard() {
        console.log(this.board.map(row => row.join(" | ")).join("\n"));
    }

    displayGame() {
        console.log(this.board());
    }
}

let gameBoard = new GameBoard(3, 3);
gameBoard.displayGame();
console.log(new GameBoard(3, 3, "O", "X"))