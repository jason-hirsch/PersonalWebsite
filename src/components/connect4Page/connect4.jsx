import React, { Component } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import { alphabeta_minmax } from "./connect4AI";

class Connect4 extends Component {
    state = {
        rows: 6,
        cols: 7,
        stageWidth: 700,
        stageHeight: 600,
        gameIsOver: false,
        currentlyHovered: { row: undefined, col: undefined },
        cells: [[]],
    };

    resetBoard() {
        let initialCells = Array.from(Array(this.state.rows), () => {
            return Array.from(Array(this.state.cols), () => {
                return {
                    state: "empty",
                    hoverState: "empty",
                    color: "",
                    opacity: 1,
                    circled: false,
                };
            });
        });

        this.setState({
            gameIsOver: false,
            currentlyHovered: { row: undefined, col: undefined },
            cells: initialCells,
        });
    }

    componentDidMount() {
        this.resetBoard();
        this.checkSize();
        window.addEventListener("resize", this.checkSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkSize);
    }

    checkSize = () => {
        let w = window.innerWidth * 0.6; //Use 60% of window width/height
        let h = window.innerHeight * 0.6;
        let calcW = 0;
        let calcH = 0;

        if (w / this.state.cols < h / this.state.rows) {
            calcW = w;
            calcH = (w / this.state.cols) * this.state.rows;
        } else {
            calcW = (h / this.state.rows) * this.state.cols;
            calcH = h;
        }

        this.setState({
            stageWidth: calcW,
            stageHeight: calcH,
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center py-4">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => this.resetBoard()}
                    >
                        Reset Board
                    </button>
                </div>

                <div className="d-flex justify-content-center">
                    <Stage
                        width={this.state.stageWidth}
                        height={this.state.stageHeight}
                    >
                        <Layer>
                            {this.state.cells.map((row, rowIdx) => {
                                return row.map((cell, colIdx) => (
                                    <React.Fragment
                                        key={
                                            rowIdx.toString() +
                                            "," +
                                            colIdx.toString()
                                        }
                                    >
                                        {this.getInsideShape(
                                            rowIdx,
                                            colIdx,
                                            cell
                                        )}
                                        {this.getCircledShape(
                                            rowIdx,
                                            colIdx,
                                            cell
                                        )}
                                        <Rect
                                            x={
                                                (colIdx / this.state.cols) *
                                                this.state.stageWidth
                                            }
                                            y={
                                                (rowIdx / this.state.rows) *
                                                this.state.stageHeight
                                            }
                                            width={
                                                this.state.stageWidth /
                                                this.state.cols
                                            }
                                            height={
                                                this.state.stageHeight /
                                                this.state.rows
                                            }
                                            stroke="white"
                                            strokeWidth={4}
                                        />
                                    </React.Fragment>
                                ));
                            })}
                            {[...Array(this.state.cols).keys()].map((col) => (
                                <React.Fragment
                                    key={col.toString() + "colHoverRect"}
                                >
                                    <Rect
                                        x={
                                            (col / this.state.cols) *
                                            this.state.stageWidth
                                        }
                                        y={0}
                                        width={
                                            this.state.stageWidth /
                                            this.state.cols
                                        }
                                        height={this.state.stageHeight}
                                        stroke="white"
                                        strokeWidth={4}
                                        onMouseEnter={(e) => {
                                            this.handleMouseEnter(col);
                                        }}
                                        onMouseLeave={(e) => {
                                            this.handleMouseLeave();
                                        }}
                                        onClick={(e) => {
                                            this.handleClick(col);
                                        }}
                                        onTap={(e) => {
                                            this.handleClick(col);
                                        }}
                                    />
                                </React.Fragment>
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </React.Fragment>
        );
    }

    getInsideShape(row, col, cell) {
        if (cell.state === "filled" || cell.hoverState === "filled") {
            return (
                <Circle
                    x={
                        (col / this.state.cols) * this.state.stageWidth +
                        this.state.stageWidth / this.state.cols / 2
                    }
                    y={
                        (row / this.state.rows) * this.state.stageHeight +
                        this.state.stageHeight / this.state.rows / 2
                    }
                    radius={this.state.stageWidth / this.state.cols / 2.4}
                    fill={cell.color}
                    strokeWidth={4}
                    opacity={cell.opacity}
                />
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }

    getCircledShape(row, col, cell) {
        if (cell.circled === true) {
            return (
                <Circle
                    x={
                        (col / this.state.cols) * this.state.stageWidth +
                        this.state.stageWidth / this.state.cols / 2
                    }
                    y={
                        (row / this.state.rows) * this.state.stageHeight +
                        this.state.stageHeight / this.state.rows / 2
                    }
                    radius={this.state.stageWidth / this.state.cols / 2.2}
                    stroke={"yellow"}
                    strokeWidth={4}
                    opacity={cell.opacity}
                />
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }

    getLowestRow(col) {
        let lowestRow = undefined;

        for (let row = this.state.rows - 1; row >= 0; row--) {
            if (this.state.cells[row][col].state !== "filled") {
                lowestRow = row;
                break;
            }
        }

        return lowestRow;
    }

    circleIfWin(board, color) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length - 3; col++) {
                if (
                    board[row][col].color === color &&
                    board[row][col + 1].color === color &&
                    board[row][col + 2].color === color &&
                    board[row][col + 3].color === color
                ) {
                    board[row][col].circled = true;
                    board[row][col + 1].circled = true;
                    board[row][col + 2].circled = true;
                    board[row][col + 3].circled = true;
                    return true;
                }
            }
        }

        for (let row = 0; row < board.length - 3; row++) {
            for (let col = 0; col < board[0].length; col++) {
                if (
                    board[row][col].color === color &&
                    board[row + 1][col].color === color &&
                    board[row + 2][col].color === color &&
                    board[row + 3][col].color === color
                ) {
                    board[row][col].circled = true;
                    board[row + 1][col].circled = true;
                    board[row + 2][col].circled = true;
                    board[row + 3][col].circled = true;
                    return true;
                }
            }
        }

        for (let row = 0; row < board.length - 3; row++) {
            for (let col = 0; col < board[0].length - 3; col++) {
                if (
                    board[row][col].color === color &&
                    board[row + 1][col + 1].color === color &&
                    board[row + 2][col + 2].color === color &&
                    board[row + 3][col + 3].color === color
                ) {
                    board[row][col].circled = true;
                    board[row + 1][col + 1].circled = true;
                    board[row + 2][col + 2].circled = true;
                    board[row + 3][col + 3].circled = true;
                    return true;
                }
            }
        }

        for (let row = 3; row < board.length; row++) {
            for (let col = 0; col < board[0].length - 3; col++) {
                if (
                    board[row][col].color === color &&
                    board[row - 1][col + 1].color === color &&
                    board[row - 2][col + 2].color === color &&
                    board[row - 3][col + 3].color === color
                ) {
                    board[row][col].circled = true;
                    board[row - 1][col + 1].circled = true;
                    board[row - 2][col + 2].circled = true;
                    board[row - 3][col + 3].circled = true;
                    return true;
                }
            }
        }

        return false;
    }

    handleMouseEnter(col) {
        if (this.state.gameIsOver === false) {
            let lowestRow = this.getLowestRow(col);

            if (lowestRow !== undefined) {
                let currCells = this.state.cells;
                currCells[lowestRow][col].hoverState = "filled";
                currCells[lowestRow][col].color = "red";
                currCells[lowestRow][col].opacity = 0.5;
                this.setState({
                    currentlyHovered: { row: lowestRow, col: col },
                    cells: currCells,
                });
            } else {
                this.setState({
                    currentlyHovered: { row: undefined, col: undefined },
                });
            }
        }
    }

    handleMouseLeave() {
        let currRow = this.state.currentlyHovered.row;
        let currCol = this.state.currentlyHovered.col;
        if (currRow !== undefined && currCol !== undefined) {
            let currCells = this.state.cells;
            currCells[currRow][currCol].hoverState = "empty";
            currCells[currRow][currCol].color = "";
            currCells[currRow][currCol].opacity = 1;
            this.setState({
                currentlyHovered: { row: undefined, col: undefined },
                cells: currCells,
            });
        }
    }

    handleClick(col) {
        if (this.state.gameIsOver === false) {
            let currRow = this.getLowestRow(col);
            let currCol = col;
            if (currRow !== undefined && currCol !== undefined) {
                let currCells = this.state.cells;
                currCells[currRow][currCol].state = "filled";
                currCells[currRow][currCol].hoverState = "empty";
                currCells[currRow][currCol].color = "red";
                currCells[currRow][currCol].opacity = 1;

                let simpleBoard = Array.from(
                    Array(currCells.length),
                    (elem1, row) => {
                        return Array.from(
                            Array(currCells[0].length),
                            (elem2, col) => {
                                if (currCells[row][col].color === "red") {
                                    return 1;
                                } else if (
                                    currCells[row][col].color === "blue"
                                ) {
                                    return 2;
                                }
                                return 0;
                            }
                        );
                    }
                );

                if (this.circleIfWin(currCells, "red")) {
                    this.setState({
                        gameIsOver: true,
                        currentlyHovered: { row: undefined, col: undefined },
                    });
                } else {
                    let minmaxResult = alphabeta_minmax(
                        simpleBoard,
                        5,
                        true,
                        Number.MIN_SAFE_INTEGER,
                        Number.MAX_SAFE_INTEGER
                    );

                    if (minmaxResult[0] !== -1) {
                        let aiPlayRow = this.getLowestRow(minmaxResult[0]);
                        currCells[aiPlayRow][minmaxResult[0]].state = "filled";
                        currCells[aiPlayRow][minmaxResult[0]].hoverState =
                            "empty";
                        currCells[aiPlayRow][minmaxResult[0]].color = "blue";
                        currCells[aiPlayRow][minmaxResult[0]].opacity = 1;
                    } else {
                        this.setState({
                            gameIsOver: true,
                            currentlyHovered: {
                                row: undefined,
                                col: undefined,
                            },
                        });
                    }

                    if (this.circleIfWin(currCells, "blue")) {
                        this.setState({
                            gameIsOver: true,
                            currentlyHovered: {
                                row: undefined,
                                col: undefined,
                            },
                        });
                    }
                }

                this.setState({
                    currentlyHovered: { row: undefined, col: undefined },
                    cells: currCells,
                });

                this.handleMouseEnter(currCol);
            }
        }
    }
}

export default Connect4;
