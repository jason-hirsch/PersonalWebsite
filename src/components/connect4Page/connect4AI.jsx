export function alphabeta_minmax(board, depth, maximizing, alpha, beta) {
    if (depth === 0) {
        return [-1, boardScore(board, 2)];
    } else if (boardIsWon(board, 2)) {
        return [-1, Number.MAX_SAFE_INTEGER];
    } else if (boardIsWon(board, 1)) {
        return [-1, Number.MIN_SAFE_INTEGER];
    } else if (getPlayablePositions(board).length === 0) {
        return [-1, 0];
    }

    let value = maximizing ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
    let bestColumn = -1;

    for (let [playableRow, playableCol] of getPlayablePositions(board)) {
        placePiece(board, playableRow, playableCol, maximizing ? 2 : 1);

        if (maximizing) {
            let minmaxResult = alphabeta_minmax(
                board,
                depth - 1,
                !maximizing,
                alpha,
                beta
            );

            if (minmaxResult[1] > value) {
                value = minmaxResult[1];
                bestColumn = playableCol;
            }
            alpha = Math.max(alpha, value);
        } else {
            let minmaxResult = alphabeta_minmax(
                board,
                depth - 1,
                !maximizing,
                alpha,
                beta
            );

            if (minmaxResult[1] < value) {
                value = minmaxResult[1];
                bestColumn = playableCol;
            }
            beta = Math.min(beta, value);
        }

        removePiece(board, playableRow, playableCol);

        if (alpha >= beta) {
            break;
        }
    }

    return [bestColumn, value];
}

function boardIsWon(board, piece) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length - 3; col++) {
            if (
                board[row][col] === piece &&
                board[row][col + 1] === piece &&
                board[row][col + 2] === piece &&
                board[row][col + 3] === piece
            ) {
                return true;
            }
        }
    }

    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (
                board[row][col] === piece &&
                board[row + 1][col] === piece &&
                board[row + 2][col] === piece &&
                board[row + 3][col] === piece
            ) {
                return true;
            }
        }
    }

    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 0; col < board[0].length - 3; col++) {
            if (
                board[row][col] === piece &&
                board[row + 1][col + 1] === piece &&
                board[row + 2][col + 2] === piece &&
                board[row + 3][col + 3] === piece
            ) {
                return true;
            }
        }
    }

    for (let row = 3; row < board.length; row++) {
        for (let col = 0; col < board[0].length - 3; col++) {
            if (
                board[row][col] === piece &&
                board[row - 1][col + 1] === piece &&
                board[row - 2][col + 2] === piece &&
                board[row - 3][col + 3] === piece
            ) {
                return true;
            }
        }
    }

    return false;
}

function getPlayablePositions(board) {
    let playablePositions = [];
    for (let col = 0; col < board[0].length; col++) {
        let row = findFirstOpenRow(board, col);
        if (row !== -1) {
            playablePositions.push([row, col]);
        }
    }
    return playablePositions;
}

function findFirstOpenRow(board, col) {
    for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            return row;
        }
    }
    return -1;
}

function placePiece(board, row, col, piece) {
    board[row][col] = piece;
}

function removePiece(board, row, col) {
    board[row][col] = 0;
}

function scoreWindow(window, piece) {
    let score = 0;
    let oppositePiece = piece === 1 ? 2 : 1;

    let pieceCount = window.filter((x) => x === piece).length;
    let oppositePieceCount = window.filter((x) => x === oppositePiece).length;
    let emptyCount = window.filter((x) => x === 0).length;

    if (pieceCount === 4) {
        score += 100;
    } else if (pieceCount === 3 && emptyCount === 1) {
        score += 5;
    } else if (pieceCount === 2 && emptyCount === 2) {
        score += 2;
    } else if (oppositePieceCount === 3 && emptyCount === 1) {
        score -= 4;
    }

    return score;
}

function boardScore(board, piece) {
    let score = 0;

    for (let row = 0; row < board.length; row++) {
        if (board[row][Math.floor(board[0].length / 2)] === piece) {
            score += 3;
        }
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length - 3; col++) {
            let window = [
                board[row][col],
                board[row][col + 1],
                board[row][col + 2],
                board[row][col + 3],
            ];
            score += scoreWindow(window, piece);
        }
    }

    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length - 3; row++) {
            let window = [
                board[row][col],
                board[row + 1][col],
                board[row + 2][col],
                board[row + 3][col],
            ];
            score += scoreWindow(window, piece);
        }
    }

    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 0; col < board[0].length - 3; col++) {
            let window = [
                board[row][col],
                board[row + 1][col + 1],
                board[row + 2][col + 2],
                board[row + 3][col + 3],
            ];
            score += scoreWindow(window, piece);
        }
    }

    for (let row = 3; row < board.length; row++) {
        for (let col = 0; col < board[0].length - 3; col++) {
            let window = [
                board[row][col],
                board[row - 1][col + 1],
                board[row - 2][col + 2],
                board[row - 3][col + 3],
            ];
            score += scoreWindow(window, piece);
        }
    }

    return score;
}
