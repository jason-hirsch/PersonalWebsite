import React, { Component } from "react";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";

class AboutMe extends Component {
    state = {
        icons: [
            {
                icon: "fab fa-linkedin-in",
                link: "https://www.linkedin.com/in/jason-t-hirsch/",
            },
            { icon: "fab fa-github", link: "https://github.com/jason-hirsch" },
            { icon: "far fa-envelope", link: "mailto:jasonhirsch36@gmail.com" },
        ],
    };
    render() {
        return (
            <div style={{ height: "100vh" }}>
                <div className="py-5"></div>
                <div className="py-5"></div>
                <div className="py-5"></div>
                <h1 className="display-1 bg-dark text-warning text-center">
                    Jason Hirsch
                </h1>
                <div className="d-flex justify-content-center">
                    {this.state.icons.map((icon) => (
                        <a
                            key={icon.icon}
                            role="button"
                            className="btn btn-dark m-3"
                            href={icon.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className={icon.icon + " fa-2x"}></i>
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

export default AboutMe;
