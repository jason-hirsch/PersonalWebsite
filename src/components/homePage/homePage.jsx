import React, { Component } from "react";
import AboutMe from "./aboutMe";
import Showcase from "./showcase";
import "../../styles/main.css";
import TetrisImage from "../../images/tetris.png";
import Connect4Image from "../../images/connect4.png";
import DllInjectorImage from "../../images/dllInjector.png";

class HomePage extends Component {
    state = {
        showcaseEntries: [
            {
                title: "Tetris AI",
                description:
                    "Either play the game of tetris or watch an AI play it. The AI uses a depth first search algorithm to determine what moves to make.",
                technologies: [
                    "Javascript",
                    "ReactJS",
                    "KonvaJS",
                    "Depth First Search",
                ],
                github: "https://github.com/jason-hirsch/PersonalWebsite/tree/master/src/components/tetrisPage",
                tryIt: "/games/tetris",
                image: TetrisImage,
            },
            {
                title: "Connect4 AI",
                description:
                    "Play the game of connect 4 against an AI. The AI uses a minmax algorithm with alpha-beta pruning to determine what move to make.",
                technologies: [
                    "Javascript",
                    "ReactJS",
                    "KonvaJS",
                    "Minmax Algorithm",
                ],
                github: "https://github.com/jason-hirsch/PersonalWebsite/tree/master/src/components/connect4Page",
                tryIt: "/games/connect4",
                image: Connect4Image,
            },
            {
                title: "DLL Injector",
                description:
                    "A desktop application for injecting dynamic linked libraries (DLLs) into exectuables.",
                technologies: ["C++", "Qt UI Framework", "Windows SDK"],
                github: "https://github.com/jason-hirsch",
                image: DllInjectorImage,
            },
        ],
    };

    render() {
        return (
            <div className="main-div">
                <AboutMe></AboutMe>
                {this.state.showcaseEntries.map((entry) => (
                    <Showcase
                        key={entry.title}
                        title={entry.title}
                        description={entry.description}
                        technologies={entry.technologies}
                        github={entry.github}
                        tryIt={entry.tryIt}
                        image={entry.image}
                    ></Showcase>
                ))}
            </div>
        );
    }
}

export default HomePage;
