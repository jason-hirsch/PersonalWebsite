import React, { Component } from "react";
import "../styles/navButton.css";

class NavButton extends Component {
    render() {
        return this.getNavButton(this.props.data);
    }

    getNavButton = (navButton) => {
        if (navButton.children.length === 0) {
            return (
                <div className={this.props.className}>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href={navButton.header.link}
                                >
                                    {navButton.header.name}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={this.props.className}>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    ></button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    //href="#"
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
                                    {navButton.children.map((child) => (
                                        <li key={child.name}>
                                            <a
                                                className="dropdown-item"
                                                href={child.link}
                                            >
                                                {child.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    };
}

export default NavButton;
