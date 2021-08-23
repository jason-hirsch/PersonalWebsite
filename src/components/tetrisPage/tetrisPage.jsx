import React, { Component } from "react";
import Tetris from "./tetris";
import "../../styles/main.css";

class TetrisPage extends Component {
    render() {
        return (
            <div className="main-div">
                <div className="py-5"></div>
                <h1 className="display-1 bg-dark text-warning text-center">
                    Tetris
                </h1>
                <p className="display-1 bg-dark description-text text-center px-5">
                    Either play the game of tetris or watch an AI play it. The
                    AI uses a depth first search algorithm to determine what
                    moves to make.
                </p>
                <p className="display-1 bg-dark description-text text-center px-5">
                    To play the game yourself, have the AI off and use the WASD
                    keys. A moves left, D moves right, W rotates clockwise, and
                    S rotates counter clockwise.
                </p>
                <Tetris></Tetris>
            </div>
        );
    }
}

export default TetrisPage;
