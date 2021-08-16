import React, { Component } from "react";
import "../styles/main.css";

class Footer extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <div className="py-5"></div>
                <div className="py-1 footer-text text-center bg-dark">
                    Copyright © Jason Hirsch
                </div>
            </React.Fragment>
        );
    }
}

export default Footer;
