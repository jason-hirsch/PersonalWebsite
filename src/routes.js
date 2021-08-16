import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/homePage/homePage";
import Connect4Page from "./components/connect4Page/connect4Page";
import TetrisPage from "./components/tetrisPage/tetrisPage";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

export default function App() {
    return (
        <Router>
            <NavBar></NavBar>
            <Switch>
                <Route exact path="/">
                    <HomePage></HomePage>
                </Route>
                <Route path="/games/connect4">
                    <Connect4Page></Connect4Page>
                </Route>
                <Route path="/games/tetris">
                    <TetrisPage></TetrisPage>
                </Route>
            </Switch>
            <Footer></Footer>
        </Router>
    );
}
