import React, { Component } from "react";
import Connect4 from "./connect4";
import "../../styles/main.css";

class Connect4Page extends Component {
    render() {
        return (
            <div className="main-div">
                <div className="py-5"></div>
                <h1 className="display-1 bg-dark text-warning text-center">
                    Connect 4
                </h1>
                <p className="display-1 bg-dark description-text text-center px-5">
                    Play the game of connect 4 against an AI. The AI uses a
                    minmax algorithm with alpha-beta pruning to determine what
                    move to make.
                </p>
                <Connect4></Connect4>
            </div>
        );
    }
}

export default Connect4Page;
