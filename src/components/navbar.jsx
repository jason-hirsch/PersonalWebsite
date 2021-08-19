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
            <React.Fragment>
                <link href="/src/styles/navButton.css" rel="stylesheet"></link>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid d-flex justify-content-end">
                        {this.state.navButtons.map((navButton) => (
                            <NavButton
                                key={navButton.header.name}
                                className="mx-4"
                                data={navButton}
                            ></NavButton>
                        ))}
                        <div className="spacer"></div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default NavBar;
