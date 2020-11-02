import React from "react";
import { Link } from "react-router-dom";

export default () => (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <h1 className="display-4">Perfect Squares</h1>
                <p className="lead">
                    Some perfect squares for the mathematically curious.
                </p>
                <hr className="my-4" />
                <Link
                    to="/squares"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    View Squares
                </Link>
            </div>
        </div>
    </div>
);