import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Squares from "../components/Squares";
import Square from "../components/Square";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/squares" exact component={Squares} />
            <Route path="/square/:id" exact component={Square} />
        </Switch>
    </Router>
);