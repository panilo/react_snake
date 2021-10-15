import React from "react";
import Grid from "./Grid";
import { arraysEqual, isArrayInArray } from "../utils/utils";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: [7, 7],
      snake: [[]],
      food: [],
      direction: "E",
      playInterval: null,
      snakeLength: 1,
      loose: false,
    };
  }

  // Return the middle of the grid represented like an array
  // [3, 3] (x, y)
  // The gridSize input is an array
  getMiddleGridTileCoordinates() {
    const xSize = this.state.gridSize[0];
    const ySize = this.state.gridSize[1];

    // parseInt is a function to get the integer part of float number
    // e.g. 3.5 (float) ==> 3 (int)
    const xMiddle = parseInt(xSize / 2);
    const yMiddle = parseInt(ySize / 2);

    return [xMiddle, yMiddle];
  }

  // Return random coordinates in the grid [x, y]
  getRandomGridCoordinates() {
    const xSize = this.state.gridSize[0];
    const ySize = this.state.gridSize[1];

    const xRandom = Math.floor(Math.random() * xSize);
    const yRandom = Math.floor(Math.random() * ySize);

    return [xRandom, yRandom];
  }

  // Lifecycle method of React component
  componentDidMount() {
    const middleCoordinates = this.getMiddleGridTileCoordinates(
      this.state.gridSize
    );
    const foodCoordinates = [middleCoordinates[0] + 2, middleCoordinates[1]];
    this.setState({
      snake: [middleCoordinates],
      food: foodCoordinates,
    });

    document.addEventListener("keydown", (event) => this.handleKeyDown(event));

    this.resumeGame();
  }

  // Handle keydown event
  handleKeyDown(event) {
    const keyCode = event.code;

    switch (keyCode) {
      case "ArrowUp":
        this.changeDirection("N");
        break;
      case "ArrowDown":
        this.changeDirection("S");
        break;
      case "ArrowLeft":
        this.changeDirection("W");
        break;
      case "ArrowRight":
        this.changeDirection("E");
        break;
    }
  }

  // This function plays a round of the game
  // 1. Check if the snake has run in itself
  // 2. Check if the snake has eaten something in the cell is in
  // 3. Move the snake forward accordingly to the direction
  playRound() {
    if (this.state.loose || this.youLoose()) {
      return;
    }

    this.hasEaten();
    this.moveSnake();
  }

  // This function return a random position in the grid excluding snake's tiles
  getFoodCoordinates() {
    const rand = this.getRandomGridCoordinates();
    if (isArrayInArray(this.state.snake, rand))
      return this.getFoodCoordinates();

    return rand;
  }

  // Check loosing conditions
  // 1. Snake head cross snake body
  youLoose() {
    if (isArrayInArray(this.state.snake.slice(1), this.state.snake[0])) {
      this.setState({ loose: true });
      this.pauseGame();
      return true;
    }

    return false;
  }

  // Check if the snake has eaten
  hasEaten() {
    const snakeHeadPosition = this.state.snake[0];
    const foodPosition = this.state.food;

    if (arraysEqual(snakeHeadPosition, foodPosition)) {
      // Add 1 unit to the snake length
      const snakeLength = this.state.snakeLength + 1;
      // Get the next food position
      const food = this.getFoodCoordinates();
      // Update state
      this.setState({ snakeLength, food });
    }
  }

  // This function will move the snake updating its position accordingly to the
  // movement direction
  moveSnake() {
    switch (this.state.direction) {
      case "E":
        this.turnRight();
        break;
      case "W":
        this.turnLeft();
        break;
      case "N":
        this.goUp();
        break;
      case "S":
        this.goDown();
        break;
    }

    // const nextPositionY = snakeY >= this.state.gridSize[1] ? 0 : snakeY + 1;
  }

  // Get the last snake-head coordinates and the positions history sliced by the snake size
  getCurrentSnakePosition() {
    const snakePositionHistory = this.state.snake.slice(
      0,
      this.state.snakeLength
    );
    const snakeCurrentPosition = snakePositionHistory[0];
    const snakeX = snakeCurrentPosition[0];
    const snakeY = snakeCurrentPosition[1];

    return { snakeX, snakeY, snakePositionHistory };
  }

  goUp() {
    const { snakeX, snakeY, snakePositionHistory } =
      this.getCurrentSnakePosition();

    // Check if we reach the outer north edge (0)
    // if yest restart from the bottom (this.state.gridSize[1])
    // otherwise add one to current Y position
    const nextNorthY = snakeY <= 0 ? this.state.gridSize[1] - 1 : snakeY - 1;
    this.setState({ snake: [[snakeX, nextNorthY], ...snakePositionHistory] });
  }

  goDown() {
    const { snakeX, snakeY, snakePositionHistory } =
      this.getCurrentSnakePosition();

    // Check if we reach the outer south edge (this.state.gridSize[1])
    // if yest restart from the top (0)
    // otherwise remove one to current Y position
    const nextNorthY = snakeY >= this.state.gridSize[1] - 1 ? 0 : snakeY + 1;
    this.setState({ snake: [[snakeX, nextNorthY], ...snakePositionHistory] });
  }

  turnRight() {
    const { snakeX, snakeY, snakePositionHistory } =
      this.getCurrentSnakePosition();

    // Check if we reach the outer east edge (this.state.gridSize[0])
    // if yes restart from the west edge 0
    // otherwise add one to current X position
    const nextEastX = snakeX >= this.state.gridSize[0] - 1 ? 0 : snakeX + 1;
    this.setState({ snake: [[nextEastX, snakeY], ...snakePositionHistory] });
  }

  turnLeft() {
    const { snakeX, snakeY, snakePositionHistory } =
      this.getCurrentSnakePosition();

    // Check if we reach the outer west edge (0)
    // if yes restart from the east edge (this.state.gridSize[0])
    // otherwise remove one to current X position
    const nextWestX = snakeX <= 0 ? this.state.gridSize[0] - 1 : snakeX - 1;
    this.setState({ snake: [[nextWestX, snakeY], ...snakePositionHistory] });
  }

  // Change the snake direction
  changeDirection(newDirection) {
    const dir = this.state.direction;
    if (
      // Check if the new direction can be taken based on the current direction
      (newDirection == "E" && dir == "W") ||
      (newDirection == "W" && dir == "E") ||
      (newDirection == "N" && dir == "S") ||
      (newDirection == "S" && dir == "N")
    )
      return;

    this.setState({ direction: newDirection });
  }

  pauseGame() {
    if (this.state.playInterval !== null) {
      clearInterval(this.state.playInterval);
      this.setState({ playInterval: null });
    }
  }

  resumeGame() {
    if (this.state.snakeMoveInterval == null && !this.state.loose) {
      const playInterval = setInterval(() => this.playRound(), 500);
      this.setState({ playInterval });
    }
  }

  render() {
    return (
      <>
        <Grid
          size={this.state.gridSize}
          snake={this.state.snake}
          food={this.state.food}
        />
        <div className="right-panel">
          <h3>Data</h3>
          <p>
            Head position X {this.state.snake[0][0]} - Y{" "}
            {this.state.snake[0][1]}
            <br />
            Size {this.state.snakeLength}
            <br />
            Snake: {this.state.snake.join("[")}
            <br />
            Game status: {!this.state.loose ? "In progress" : "Game over"}
          </p>
          <h3>Direction</h3>
          <button onClick={() => this.changeDirection("N")}>Up</button>
          <br />
          <button onClick={() => this.changeDirection("S")}>Down</button>
          <br />
          <button onClick={() => this.changeDirection("W")}>Left</button>
          <br />
          <button onClick={() => this.changeDirection("E")}>Right</button>
          <br />
          <h3>Pause / Resume</h3>
          {this.state.playInterval !== null ? (
            <button onClick={() => this.pauseGame()}>Pause</button>
          ) : (
            <button onClick={() => this.resumeGame()}>Resume</button>
          )}
        </div>
      </>
    );
  }
}

export default Game;
