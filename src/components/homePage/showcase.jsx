import React, { Component } from "react";
import Resizer from "react-image-file-resizer";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";

class Showcase extends Component {
    state = {
        image: "",
    };

    imgDivRef = undefined;

    constructor(props) {
        super(props);
        this.state.image = this.props.image;
        this.imgDivRef = React.createRef();
    }

    componentDidMount() {
        //this.resizeImage();
        //window.addEventListener("resize", this.resizeImage);
    }

    componentWillUnmount() {
        //window.removeEventListener("resize", this.resizeImage);
    }

    resizeImage = () => {
        fetch(this.props.image)
            .then((response) => response.blob())
            .then((image) =>
                Resizer.imageFileResizer(
                    image,
                    this.imgDivRef.current.offsetWidth * 0.7,
                    this.imgDivRef.current.offsetHeight * 0.7,
                    "JPEG",
                    100,
                    0,
                    (uri) => this.setState({ image: uri })
                )
            );
    };

    render() {
        return (
            <div
                className="d-flex flex-row justify-content-center"
                style={{ height: "100vh" }}
            >
                <div className="d-inline d-flex flex-column justify-content-center px-5">
                    <h1 className="display-4 bg-dark text-warning px-5 py-3">
                        {this.props.title}
                    </h1>
                    <p className="description-text px-5 py-1">
                        {this.props.description}
                    </p>
                    <p className="technology-text px-5 py-1">
                        {this.props.technologies.join(", ")}
                    </p>
                    <div className="d-flex flex-row px-5">
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

                <div className="d-inline text-center px-5" ref={this.imgDivRef}>
                    <div
                        className="d-flex flex-column justify-content-center px-5"
                        style={{ height: "100%" }}
                    >
                        <img
                            className="mx-auto py-1"
                            src={this.state.image}
                            alt=""
                        ></img>
                    </div>
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
