import React from "react";
import { Link } from "react-router-dom";


function isSquare(matrix){
    const dimension = matrix.length;
    for(let i = 0; i < dimension; i++){
        if(matrix[i].length !== dimension){
            return false;
        }
    }
    return true;
}

function uniquenessChecker(matrix){
    var tempHash = {};
    var hash = {};
    for (let i = 0; i <  matrix.length; i++){
        for (let j = 0; j <  matrix[i].length; j++){
           if (tempHash[matrix[i][j]]){
               hash[matrix[i][j]] = false;
           }
           else {
               tempHash[matrix[i][j]] = [i, j];
               hash[matrix[i][j]] = true;
           }
        }
    }
    const keyArray = Object.keys(hash);
    hash.full = false;
    for (let i = 0; i < keyArray.length; i++){
        if (!hash[keyArray[i]]){
            return hash;
        }
    }
    hash.full = true;
    return hash;
}

function equalityChecker(array){
    var hash = {};
    for (let i = 0; i <  array.length; i++){
            if (hash[array[i]]){
                hash[array[i]].push(i);
            }
            else {
                hash[array[i]] = [i];
            }
    }
    const keyArray = Object.keys(hash);
    var longest = [0, 0];
    for (let i = 0; i < keyArray.length; i++){
        if (hash[keyArray[i]].length > longest[0]){
            longest[0] = hash[keyArray[i]].length;
            longest[1] = keyArray[i];
        }
    }
    var retHash = {};
    retHash.equality = keyArray.length === 1;
    retHash.longest = longest[1];
    return retHash;
}

function rowTotals(matrix, squareness){
    if (squareness) {
        const dimension = matrix.length;
        let temp = 0;
        let tempArray = [];
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                temp += matrix[i][j];
            }
            tempArray[i] = temp;
            temp = 0;
        }
        return tempArray;
    }
    else {
        return [];
    }
}

function leftRightTotal(matrix, squareness){
    if (squareness) {
        const dimension = matrix.length;
        let temp = 0;
        for (let i = 0; i < dimension; i++) {
                temp += matrix[i][i];
            }
        return temp;
    }
}

function rightLeftTotal(matrix, squareness){
    if (squareness) {
        const dimension = matrix.length;
        let temp = 0;
        let lastIndex = dimension - 1;
        for (let i = 0; i < dimension; i++) {
            temp += matrix[i][lastIndex - i];
        }
        return temp;
    }
}

function columnTotal(matrix, squareness){
    if (squareness) {
        const dimension = matrix.length;
        let temp = 0;
        let tempArray = [];
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                temp += matrix[j][i];
            }
            tempArray[i] = temp;
            temp = 0;
        }
        return tempArray;
    }
    else {
        return [];
    }
}

function rangeChecker(matrix){
    const dimension = matrix.length;
    const rangeCap = dimension**2 +1;
    console.log(rangeCap);
    for (let i =0; i < dimension; i++){
        for (let j = 0; j < dimension; j++){
            if (matrix[i][j] < 0 || matrix[i][j] > rangeCap){
                return false;
            }
        }
    }
    return true;
}

function perfectChecker(uniqueness, squareness, equality, inRange){
    console.log("Uniqueness: " + uniqueness.full);
    console.log("Squareness: " + squareness);
    console.log("Equality-longest: " + equality.longest);
    console.log("In range: " + inRange);
    if (uniqueness.full && squareness && equality.equality && inRange){
        return <span style={{color: "green"}}>This is a perfect square!</span>
    }
    else {
        return <span style={{color: "red"}}>This is not a perfect square!</span>
    }
}

function cellColor(number, uniqueness){
    if (uniqueness[number]){
        return <td style={{backgroundColor: "PaleGreen"}}>{number}</td>
    }
    else {
        return <td style={{backgroundColor: "red"}}>{number}</td>
    }
}

function totalColor(number, equality){
    if(equality.longest == number){
        return <td style={{backgroundColor: "PaleGreen"}}>{number}</td>
    }
    else {
        return <td style={{backgroundColor: "Red"}}>{number}</td>
    }
}

function totalUnique(uniqueness){
    if(!uniqueness.full){
        return (<h3 className="position-relative d-flex align-items-center justify-content-center">
            Not all numbers are unique.
        </h3>)
    }
}

function totalRange(inRange){
    if(!inRange){
        return (<h3 className="position-relative d-flex align-items-center justify-content-center">
            Not all numbers are in range.
        </h3>)
    }
}

function totalEquality(equality){
    if(!equality.equality){
        return (<h3 className="position-relative d-flex align-items-center justify-content-center">
            Not all totals are equal.
        </h3>)
    }
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Square: { matrix: [] } };
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/squares/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ Square: response }))
            .catch(() => this.props.history.push("/Squares"));
    }

    render() {
        const {Square} = this.state;
        console.log(Square);
        const squareness = isSquare(Square.matrix);
        const colTotal = columnTotal(Square.matrix, squareness);
        const rowTotal = rowTotals(Square.matrix, squareness);
        const crossTotals = [leftRightTotal(Square.matrix, squareness), rightLeftTotal(Square.matrix, squareness)];
        const uniqueness = uniquenessChecker(Square.matrix);
        const equality = equalityChecker(rowTotal.concat(colTotal).concat(crossTotals));
        const inRange = rangeChecker(Square.matrix);
        if (squareness) {

            return (
                <div className="">
                    <div className="hero position-relative d-flex align-items-center justify-content-center">
                        <div className="overlay bg-dark position-absolute"/>
                        <h1 className="display-4 position-relative text-white">
                            {perfectChecker(uniqueness, squareness, equality, inRange)}
                        </h1>
                    </div>
                    {totalUnique(uniqueness)}
                    {totalRange(inRange)}
                    {totalEquality(equality)}
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-sm-12 col-lg-3">
                                <table>
                                    <caption>Matrix</caption>
                                    <tbody>
                                    {Square.matrix.map((array, i) => (
                                        <tr>
                                            <td></td>
                                            {array.map((number, j) => (
                                                cellColor(number, uniqueness)
                                            ))}
                                            {totalColor(rowTotal[i], equality)}
                                        </tr>

                                    ))}
                                        <tr>
                                            {totalColor(rightLeftTotal(Square.matrix, squareness), equality)}
                                            {columnTotal(Square.matrix, squareness).map((number, i) => (
                                                totalColor(number, equality)
                                            ))}
                                            {totalColor(leftRightTotal(Square.matrix, squareness), equality)}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12 col-lg-2">
                                <button type="button" className="btn btn-danger">
                                    Delete Square
                                </button>
                            </div>
                        </div>
                        <Link to="/squares" className="btn btn-link">
                            Back to Squares
                        </Link>
                    </div>
                </div>
            );
        }
        else {


            return (
                <div className="">
                    <div className="hero position-relative d-flex align-items-center justify-content-center">
                        <div className="overlay bg-dark position-absolute"/>
                        <h1 className="display-4 position-relative text-white">
                            This is not a perfect square.
                        </h1>
                    </div>
                    <h3 className="position-relative d-flex align-items-center justify-content-center">
                        For starters, it's not a square.
                    </h3>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-sm-12 col-lg-3">
                                <table>
                                    <caption>Matrix</caption>
                                    <tbody>
                                    {Square.matrix.map((array, i) => (
                                        <tr>
                                            <td></td>
                                            {array.map((number, j) => (
                                                <td id={i + '-' + j}> {number} </td>
                                            ))}
                                        </tr>

                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12 col-lg-2">
                                <button type="button" className="btn btn-danger">
                                    Delete Square
                                </button>
                            </div>
                        </div>
                        <Link to="/squares" className="btn btn-link">
                            Back to Squares
                        </Link>
                    </div>
                </div>
            );
        }
    }


}

export default Square;