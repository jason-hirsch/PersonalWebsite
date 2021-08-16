export function calculateMove(board, currentPiece) {
    let recursionObject = {
        seen: new Set(),
        currMoves: [],
        currMax: Number.MIN_SAFE_INTEGER,
        currRotations: 0,
        aiMovesRotations: 0,
        aiMoves: [],
    };

    findBestMoves.apply(this, [board, currentPiece, recursionObject]);
    return recursionObject.aiMoves;
}

function findBestMoves(board, currentPiece, recursionObject) {
    let moves = ["down", "left", "right", "cw", "ccw"];

    if (
        recursionObject.seen.has(
            [
                currentPiece.row,
                currentPiece.col,
                currentPiece.rotation,
            ].toString()
        )
    ) {
        return;
    }
    recursionObject.seen.add(
        [currentPiece.row, currentPiece.col, currentPiece.rotation].toString()
    );

    moves.forEach((move) => {
        if (move === "down") {
            currentPiece.row++;
        } else if (move === "left") {
            currentPiece.col--;
        } else if (move === "right") {
            currentPiece.col++;
        } else if (move === "cw") {
            this.rotatePiece(currentPiece, "cw");
            recursionObject.currRotations++;
        } else if (move === "ccw") {
            this.rotatePiece(currentPiece, "ccw");
            recursionObject.currRotations++;
        }

        recursionObject.currMoves.push(move);

        if (this.overlapsOrOffBoard(board, currentPiece)) {
            if (move === "down") {
                currentPiece.row--;
                board = this.placePieceOnBoard(board, currentPiece);
                let value = boardValue.apply(this, [board]);
                board = this.erasePieceOnBoard(board, currentPiece);
                currentPiece.row++;

                if (
                    value > recursionObject.currMax ||
                    (value === recursionObject.currMax &&
                        recursionObject.currRotations <
                            recursionObject.aiMovesRotations)
                ) {
                    recursionObject.aiMoves = [...recursionObject.currMoves];
                    recursionObject.aiMovesRotations =
                        recursionObject.currRotations;
                    recursionObject.currMax = value;
                }
            }
        } else {
            findBestMoves.apply(this, [board, currentPiece, recursionObject]);
        }

        recursionObject.currMoves.pop();

        if (move === "down") {
            currentPiece.row--;
        } else if (move === "left") {
            currentPiece.col++;
        } else if (move === "right") {
            currentPiece.col--;
        } else if (move === "cw") {
            this.rotatePiece(currentPiece, "ccw");
            recursionObject.currRotations--;
        } else if (move === "ccw") {
            this.rotatePiece(currentPiece, "cw");
            recursionObject.currRotations--;
        }
    });
}

function columnHeight(board, col) {
    let row = 0;
    while (row < board.length && board[row][col].color === "") {
        row++;
    }

    return board.length - row;
}

function numGaps(board, col) {
    for (let row = 0; row < board.length; row++) {
        if (board[row][col].color !== "") {
            let gaps = 0;
            for (let row2 = row; row2 < board.length; row2++) {
                if (board[row2][col].color === "") {
                    gaps++;
                }
            }
            return gaps;
        }
    }

    return 0;
}

function boardValue(board) {
    let sumHeights = 0;
    for (let col = 0; col < board[0].length; col++) {
        sumHeights += columnHeight(board, col);
    }

    let fullRows = 0;
    for (let row = 0; row < board.length; row++) {
        if (this.isRowFull(board, row)) fullRows++;
    }

    let holes = 0;
    for (let col = 0; col < board[0].length; col++) {
        holes += numGaps(board, col);
    }

    let bumpiness = 0;
    for (let col = 0; col < board[0].length - 1; col++) {
        bumpiness += Math.abs(
            columnHeight(board, col) - columnHeight(board, col + 1)
        );
    }

    return (
        -0.51 * sumHeights + 0.76 * fullRows - 0.36 * holes - 0.18 * bumpiness
    );
}
