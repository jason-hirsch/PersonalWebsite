import React, { Component } from "react";
import "../styles/navButton.css";
import NavButton from "./navbutton";

class NavBar extends Component {
    state = {
        navButtons: [
            { header: { name: "Home", link: "/" }, children: [] },
            /*{
                header: { name: "Data Structures" },
                children: [
                    { name: "Red-Black Tree", link: "/datastructures/rbt" },
                    { name: "AVL Tree", link: "/datastructures/avl" },
                ],
            },
            {
                header: { name: "Algorithms" },
                children: [
                    { name: "Sorting", link: "/algorithms/sorting" },
                    { name: "Pathfinding", link: "/algorithms/pathfinding" },
                ],
            },*/
            {
                header: { name: "Games" },
                children: [
                    { name: "Tetris", link: "/games/tetris" },
                    { name: "Connect 4", link: "/games/connect4" },
                ],
            },
        ],
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto">
                            {this.state.navButtons.map((navButton) => (
                                <NavButton
                                    key={navButton.header.name}
                                    data={navButton}
                                ></NavButton>
                            ))}
                        </ul>
                    </div>
                    <div className="spacer"></div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
