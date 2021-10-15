import React from "react";
import { arraysEqual, isArrayInArray } from "../utils/utils";

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  // Check if the tile coordinates are equal to the input properties
  // this.props.snake and this.props.food are coordinates
  isFood() {
    return arraysEqual(this.props.food, [this.props.X, this.props.Y]);
  }

  isSnake() {
    return isArrayInArray(this.props.snake, [this.props.X, this.props.Y]);
    // return arraysEqual(this.props.snake, [this.props.X, this.props.Y]);
  }

  isSnakeHead() {
    return arraysEqual(this.props.snake[0], [this.props.X, this.props.Y]);
  }

  isSnakeTail() {
    return arraysEqual(this.props.snake[this.props.snake.length - 1], [
      this.props.X,
      this.props.Y,
    ]);
  }

  render() {
    const className = `tile ${this.isFood() ? "food" : ""} ${
      this.isSnake() ? "snake" : ""
    } ${this.isSnakeHead() ? "head" : ""} ${this.isSnakeTail() ? "tail" : ""}`;

    return (
      <div className={className}>
        ({this.props.X}, {this.props.Y})
      </div>
    );
  }
}

export default Tile;
