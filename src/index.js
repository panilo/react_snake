import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// This function compare the content of two arrays
function arraysEqual(arrayOne, arrayTwo) {
  // Compare the size
  if (arrayOne.length !== arrayTwo.length) {
    return false;
  }

  // Compare the content
  for (var i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] != arrayTwo[i]) {
      return false;
    }
  }

  return true;
}

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Check if the tile coordinates are equal to the input properties
    // this.props.snake and this.props.food are coordinates
    let isFood = arraysEqual(this.props.food, [this.props.X, this.props.Y])
      ? "food"
      : "";
    let isSnake = arraysEqual(this.props.snake, [this.props.X, this.props.Y])
      ? "snake"
      : "";
    let className = `tile ${isSnake} ${isFood}`;

    return (
      <div className={className}>
        ({this.props.X}, {this.props.Y})
      </div>
    );
  }
}

class Grid extends React.Component {
  render() {
    // Create and display a grid
    const grid = Array(this.props.size[0]).fill(
      Array(this.props.size[1]).fill(null)
    );
    return (
      <div className="grid">
        {grid.map((gridX, xIndex) => {
          return (
            <div className="grid-row">
              {gridX.map((gridY, yIndex) => {
                // Each tile will have a X and Y coordinates equal to the indexes
                // of the arrays we're iterating
                return (
                  <Tile
                    X={xIndex}
                    Y={yIndex}
                    snake={this.props.snake}
                    food={this.props.food}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: [7, 7],
      snake: [],
      food: [],
    };
  }

  // Return the middle of the grid represented like an array
  // [3, 3] (x, y)
  // The gridSize input is an array
  getMiddleGrid(gridSize) {
    let xSize = gridSize[0];
    let ySize = gridSize[1];

    // parseInt is a function to get the integer part of float number
    // e.g. 3.5 (float) ==> 3 (int)
    let xMiddle = parseInt(xSize / 2);
    let yMiddle = parseInt(ySize / 2);

    return [xMiddle, yMiddle];
  }

  // Lifecycle method of React component
  componentDidMount() {
    let middleCoordinates = this.getMiddleGrid(this.state.gridSize);
    this.setState({ snake: middleCoordinates });
  }

  render() {
    return (
      <>
        <Grid
          size={this.state.gridSize}
          snake={this.state.snake}
          food={this.state.food}
        />
      </>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
