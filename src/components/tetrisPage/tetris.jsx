import React, { Component } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { calculateMove } from "./tetrisAI";

class Tetris extends Component {
    state = {
        stageWidth: 100,
        stageHeight: 200,
        linesCleared: 0,
        gameIsOver: false,
        board: [[{ color: "" }]],
        currentPiece: {
            row: 0,
            col: 0,
            rows: 0,
            cols: 0,
            pieceMatrix: [[{ color: "" }]],
            rotation: 0,
        },
    };

    rows = 20;
    cols = 10;
    tickTime = 300;
    aiMoves = [];

    aiPlaying = false;

    tickInterval = undefined;

    //Pieces
    pieces = [
        [
            ["", "0", "", ""],
            ["", "0", "", ""],
            ["", "0", "", ""],
            ["", "0", "", ""],
        ],
        [
            ["", "0", ""],
            ["", "0", ""],
            ["", "0", "0"],
        ],
        [
            ["", "0", ""],
            ["", "0", ""],
            ["0", "0", ""],
        ],
        [
            ["0", "0"],
            ["0", "0"],
        ],
        [
            ["0", "0", ""],
            ["", "0", "0"],
            ["", "", ""],
        ],
        [
            ["", "0", "0"],
            ["0", "0", ""],
            ["", "", ""],
        ],
        [
            ["", "0", ""],
            ["0", "0", "0"],
            ["", "", ""],
        ],
    ];

    //Colors
    colors = ["purple", "yellow", "orange", "blue", "aqua", "green", "red"];

    constructor() {
        super();
        this.state = this.getResetState();
        this.state.stageWidth = 100;
        this.state.stageHeight = 200;
    }

    componentDidMount() {
        this.resetBoard();
        this.checkSize();
        window.addEventListener("resize", this.checkSize);
        this.tickInterval = setInterval(() => this.gameTick(), this.tickTime);
        window.addEventListener("keydown", (event) =>
            this.handleKeyDown(event)
        );
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", (event) =>
            this.handleKeyDown(event)
        );
        window.removeEventListener("resize", () => this.checkSize);
        clearInterval(this.tickInterval);
    }

    checkSize = () => {
        let w = window.innerWidth * 0.6; //Use 60% of window width/height
        let h = window.innerHeight * 0.6;
        let calcW = 0;
        let calcH = 0;

        if (w / this.cols < h / this.rows) {
            calcW = w;
            calcH = (w / this.cols) * this.rows;
        } else {
            calcW = (h / this.rows) * this.cols;
            calcH = h;
        }

        this.setState({ stageWidth: calcW, stageHeight: calcH });
    };

    render() {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg mx-2 my-2"
                        onClick={() => this.resetBoard()}
                    >
                        Reset Board
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning btn-lg mx-2 my-2"
                        onClick={() => this.toggleAI()}
                    >
                        Toggle AI
                    </button>
                </div>

                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-danger btn-lg mx-2 my-2"
                        onClick={() => this.decreaseSpeed()}
                    >
                        Decrease Speed
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-lg mx-2 my-2"
                        onClick={() => this.increaseSpeed()}
                    >
                        Increase Speed
                    </button>
                </div>

                <div className="d-flex justify-content-center">
                    <p className="display-1 bg-dark description-text text-center px-5 py-3">
                        {this.state.linesCleared + " lines cleared"}
                    </p>
                </div>

                <div className="d-flex justify-content-center">
                    <Stage
                        width={this.state.stageWidth}
                        height={this.state.stageHeight}
                    >
                        <Layer>
                            {this.state.board.map((row, rowIdx) => {
                                return row.map((cell, colIdx) => {
                                    return (
                                        <Rect
                                            key={
                                                rowIdx.toString() +
                                                "," +
                                                colIdx.toString()
                                            }
                                            x={
                                                (colIdx / this.cols) *
                                                (this.state.stageWidth - 1)
                                            }
                                            y={
                                                (rowIdx / this.rows) *
                                                (this.state.stageHeight - 1)
                                            }
                                            width={
                                                this.state.stageWidth /
                                                this.cols
                                            }
                                            height={
                                                this.state.stageHeight /
                                                this.rows
                                            }
                                            stroke="white"
                                            fill={cell.color}
                                            strokeWidth={2}
                                        />
                                    );
                                });
                            })}
                            {this.state.currentPiece.pieceMatrix.map(
                                (row, rowIdx) => {
                                    return row.map((cell, colIdx) => {
                                        return (
                                            <Rect
                                                key={
                                                    "currentPiece," +
                                                    rowIdx.toString() +
                                                    "," +
                                                    colIdx.toString()
                                                }
                                                x={
                                                    ((colIdx +
                                                        this.state.currentPiece
                                                            .col) /
                                                        this.cols) *
                                                    (this.state.stageWidth - 1)
                                                }
                                                y={
                                                    ((rowIdx +
                                                        this.state.currentPiece
                                                            .row) /
                                                        this.rows) *
                                                    (this.state.stageHeight - 1)
                                                }
                                                width={
                                                    this.state.stageWidth /
                                                    this.cols
                                                }
                                                height={
                                                    this.state.stageHeight /
                                                    this.rows
                                                }
                                                stroke="white"
                                                fill={cell.color}
                                                strokeWidth={2}
                                            />
                                        );
                                    });
                                }
                            )}
                        </Layer>
                    </Stage>
                </div>
            </React.Fragment>
        );
    }

    getResetState() {
        let initialBoard = Array.from(Array(this.rows), () => {
            return Array.from(Array(this.cols), () => {
                return { color: "" };
            });
        });

        return {
            linesCleared: 0,
            gameIsOver: false,
            board: initialBoard,
            currentPiece: {
                row: 0,
                col: 0,
                rows: 0,
                cols: 0,
                pieceMatrix: [[{ color: "" }]],
                rotation: 0,
            },
        };
    }

    resetBoard() {
        this.setState(this.getResetState());
        this.spawnPiece();
    }

    spawnPiece() {
        let randPiece =
            this.pieces[Math.floor(Math.random() * this.pieces.length)];
        let randColor =
            this.colors[Math.floor(Math.random() * this.colors.length)];
        let pieceRows = randPiece.length;
        let pieceCols = pieceRows > 0 ? randPiece[0].length : 0;

        //Copy the random piece and add color
        let randPieceMatrix = Array.from(Array(pieceRows), (row, rowIdx) =>
            [...randPiece[rowIdx]].map((x) =>
                x === "" ? { color: "" } : { color: randColor }
            )
        );

        let newPiece = {
            row: 0,
            col: Math.round(this.cols / 2) - Math.round(pieceCols / 2),
            rows: pieceRows,
            cols: pieceCols,
            pieceMatrix: randPieceMatrix,
            rotation: 0,
        };

        this.setState({
            currentPiece: newPiece,
        });

        if (this.overlapsOrOffBoard(this.state.board, newPiece)) {
            this.setState({ gameIsOver: true });
        }
    }

    overlapsOrOffBoard(board, piece) {
        for (let row = piece.row; row < piece.row + piece.rows; row++) {
            for (let col = piece.col; col < piece.col + piece.cols; col++) {
                if (
                    row < 0 ||
                    row >= this.rows ||
                    col < 0 ||
                    col >= this.cols
                ) {
                    if (
                        piece.pieceMatrix[row - piece.row][col - piece.col]
                            .color !== ""
                    ) {
                        //Return true if piece is off the board
                        return true;
                    }
                } else if (
                    piece.pieceMatrix[row - piece.row][col - piece.col]
                        .color !== "" &&
                    board[row][col].color !== ""
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    isRowFull(board, row) {
        return board[row].every((elem) => elem.color !== "");
    }

    clearRow(row) {
        let newBoard = this.state.board;
        newBoard.splice(row, 1);
        newBoard.splice(
            0,
            0,
            Array.from(Array(this.cols), (elem) => ({ color: "" }))
        );

        this.setState({ board: newBoard });
    }

    clearFullRows() {
        let rowsCleared = 0;
        for (let row = 0; row < this.rows; row++) {
            if (this.isRowFull(this.state.board, row)) {
                this.clearRow(row);
                rowsCleared++;
            }
        }

        this.setState({ linesCleared: this.state.linesCleared + rowsCleared });
    }

    getHeightWithoutEmptyRows(piece) {
        for (let row = piece.rows - 1; row >= 0; row--) {
            if (!piece.pieceMatrix[row].every((cell) => cell.color === "")) {
                return row + 1;
            }
        }

        return -1;
    }

    rotatePiece(piece, dir) {
        for (let row = 0; row < piece.rows; row++) {
            for (let col = 0; col < row; col++) {
                [piece.pieceMatrix[row][col], piece.pieceMatrix[col][row]] = [
                    piece.pieceMatrix[col][row],
                    piece.pieceMatrix[row][col],
                ];
            }
        }

        if (dir === "cw") {
            piece.pieceMatrix.reverse();
            piece.rotation++;
        } else if (dir === "ccw") {
            piece.pieceMatrix.map((row) => row.reverse());
            piece.rotation--;
        }

        piece.rotation = (piece.rotation + 4) % 4;
    }

    placePieceOnBoard(board, piece) {
        piece.pieceMatrix.forEach((row, rowIdx) => {
            row.forEach((cell, colIdx) => {
                if (cell.color !== "") {
                    board[piece.row + rowIdx][piece.col + colIdx].color =
                        cell.color;
                }
            });
        });

        return board;
    }

    erasePieceOnBoard(board, piece) {
        piece.pieceMatrix.forEach((row, rowIdx) => {
            row.forEach((cell, colIdx) => {
                if (cell.color !== "") {
                    board[piece.row + rowIdx][piece.col + colIdx].color = "";
                }
            });
        });

        return board;
    }

    gameTick() {
        if (!this.state.gameIsOver) {
            let newPiece = this.state.currentPiece;

            if (this.aiPlaying) {
                if (this.aiMoves.length === 0) {
                    //Using JSON to duplicate the object to prevent react from updating the view while the AI is calculating moves
                    this.aiMoves = calculateMove.apply(this, [
                        JSON.parse(JSON.stringify(this.state.board)),
                        JSON.parse(JSON.stringify(newPiece)),
                    ]);
                    this.aiMoves.reverse();
                }

                while (
                    this.aiMoves.length > 0 &&
                    this.aiMoves[this.aiMoves.length - 1] !== "down"
                ) {
                    let aiMove = this.aiMoves.pop();
                    if (aiMove === "left") {
                        newPiece.col--;
                    } else if (aiMove === "right") {
                        newPiece.col++;
                    } else if (aiMove === "cw") {
                        this.rotatePiece(newPiece, "cw");
                    } else if (aiMove === "ccw") {
                        this.rotatePiece(newPiece, "ccw");
                    }
                }
                if (this.aiMoves.length > 0) {
                    this.aiMoves.pop();
                }
            }

            newPiece.row++;
            this.setState({ currentPiece: newPiece });
            if (this.overlapsOrOffBoard(this.state.board, newPiece)) {
                newPiece.row--;
                this.setState({
                    board: this.placePieceOnBoard(this.state.board, newPiece),
                });
                this.spawnPiece();
                this.clearFullRows();
            }
        }
    }

    handleKeyDown(event) {
        if (!this.aiPlaying) {
            if (event.key === "w") {
                this.playerRotateRight();
            } else if (event.key === "a") {
                this.playerMoveLeft();
            } else if (event.key === "s") {
                this.playerRotateLeft();
            } else if (event.key === "d") {
                this.playerMoveRight();
            }
        }
    }

    playerMoveRight() {
        let newPiece = this.state.currentPiece;
        newPiece.col++;
        if (!this.overlapsOrOffBoard(this.state.board, newPiece)) {
            this.setState({ currentPiece: newPiece });
        } else {
            newPiece.col--;
        }
    }

    playerMoveLeft() {
        let newPiece = this.state.currentPiece;
        newPiece.col--;
        if (!this.overlapsOrOffBoard(this.state.board, newPiece)) {
            this.setState({ currentPiece: newPiece });
        } else {
            newPiece.col++;
        }
    }

    playerRotateRight() {
        let newPiece = this.state.currentPiece;
        this.rotatePiece(newPiece, "cw");
        if (!this.overlapsOrOffBoard(this.state.board, newPiece)) {
            this.setState({ currentPiece: newPiece });
        } else {
            this.rotatePiece(newPiece, "ccw");
        }
    }

    playerRotateLeft() {
        let newPiece = this.state.currentPiece;
        this.rotatePiece(newPiece, "ccw");
        if (!this.overlapsOrOffBoard(this.state.board, newPiece)) {
            this.setState({ currentPiece: newPiece });
        } else {
            this.rotatePiece(newPiece, "cw");
        }
    }

    increaseSpeed() {
        if (this.tickTime - 50 > 0) {
            clearInterval(this.tickInterval);
            this.tickTime -= 50;
            this.tickInterval = setInterval(
                () => this.gameTick(),
                this.tickTime
            );
        }
    }

    decreaseSpeed() {
        if (this.tickTime + 50 < Number.MAX_SAFE_INTEGER) {
            clearInterval(this.tickInterval);
            this.tickTime += 50;
            this.tickInterval = setInterval(
                () => this.gameTick(),
                this.tickTime
            );
        }
    }

    toggleAI() {
        this.aiPlaying = !this.aiPlaying;
        this.aiMoves = [];
    }
}

export default Tetris;
