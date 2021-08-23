import React, { Component } from "react";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../../styles/showcase.css";

class Showcase extends Component {
    state = {
        image: "",
    };

    constructor(props) {
        super(props);
        this.state.image = this.props.image;
    }

    render() {
        return (
            <div className="showcase-container d-flex">
                <div className="d-flex flex-column justify-content-center px-5 py-5">
                    <h1 className="display-4 bg-dark text-warning py-3">
                        {this.props.title}
                    </h1>
                    <p className="description-text py-1">
                        {this.props.description}
                    </p>
                    <p className="technology-text py-1">
                        {this.props.technologies.join(", ")}
                    </p>
                    <div className="d-flex flex-row">
                        <a
                            key="fab fa-github"
                            role="button"
                            className="btn btn-dark mx-2 py-1"
                            href={this.props.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className={"fab fa-github fa-2x"}></i>
                        </a>
                        {this.tryItButton()}
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center px-5 py-5">
                    <img
                        className="img-fluid mx-auto"
                        src={this.state.image}
                        alt=""
                    ></img>
                </div>
            </div>
        );
    }

    tryItButton() {
        if (this.props.tryIt !== undefined) {
            return (
                <a
                    role="button"
                    className="btn btn-outline-primary btn-lg"
                    href={this.props.tryIt}
                >
                    Try it
                </a>
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }
}

export default Showcase;
