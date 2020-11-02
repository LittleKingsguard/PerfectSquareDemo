import React from "react";
import { Link } from "react-router-dom";


class Squares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Squares: []
        };
    }
    componentDidMount() {
        const url = "/squares/";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ Squares: response }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const { Squares } = this.state;
        const allSquares = Squares.map((Square, index) => (
            <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">
                    <table>
                        <tbody>
                        {Square.matrix.map((array, i) => (
                        <tr>
                            {array.map((number, j) => (
                            <td> {number} </td>
                            ))}
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="card-body">
                        <h5 className="card-title">{ index }</h5>
                        <Link to={`/square/${Square.id}`} className="btn custom-button">
                            View Square
                        </Link>
                    </div>
                </div>
            </div>
        ));
        const noSquare = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                    No Squares yet. Why not <Link to="/new_Square">create one</Link>
                </h4>
            </div>
        );

        return (
            <>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Squares for every occasion</h1>
                        <p className="lead text-muted">
                            A broad and wonderful variety of squares, some more perfect than others.
                        </p>
                    </div>
                </section>
                <div className="py-5">
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to="/Square" className="btn custom-button">
                                Create New Square
                            </Link>
                        </div>
                        <div className="row">
                            {Squares.length > 0 ? allSquares : noSquare}
                        </div>
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                    </main>
                </div>
            </>
        );
    }
}


export default Squares;