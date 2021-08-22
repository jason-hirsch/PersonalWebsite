import React, { Component } from "react";
import "../styles/navButton.css";

class NavButton extends Component {
    render() {
        return this.getLi(this.props.data);
    }

    getLi(navButton) {
        if (navButton.children.length === 0) {
            return (
                <li className="nav-item mx-4">
                    <a className="nav-link active" href={navButton.header.link}>
                        {navButton.header.name}
                    </a>
                </li>
            );
        } else {
            return (
                <li className="nav-item dropdown mx-4">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {navButton.header.name}
                    </a>
                    <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                    >
                        {navButton.children.map((child) => {
                            return (
                                <li key={child.name}>
                                    <a
                                        className="dropdown-item"
                                        href={child.link}
                                    >
                                        {child.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            );
        }
    }
}

export default NavButton;
