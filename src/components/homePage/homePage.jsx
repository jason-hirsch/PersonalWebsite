import React, { Component } from "react";
import AboutMe from "./aboutMe";
import "../../styles/main.css";

class HomePage extends Component {
    render() {
        return (
            <div className="main-div">
                <AboutMe></AboutMe>
            </div>
        );
    }
}

export default HomePage;
