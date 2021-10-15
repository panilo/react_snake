import React from "react";
import Tile from "./Tile";

class Grid extends React.Component {
  render() {
    // Create and display a grid
    // Start with an empty grid we need to fill it with Tile
    const grid = Array(this.props.size[0]).fill(
      Array(this.props.size[1]).fill(null)
    );

    // Prepare what to render: a grid with <Tile ... /> []
    const gridWithTiles = (
      <div className="grid">
        {grid.map((gridY, yIndex) => {
          return (
            <div className="grid-row" key={yIndex}>
              {gridY.map((_, xIndex) => {
                // Each tile will have a X and Y coordinates equal to the indexes
                // of the arrays we're iterating
                return (
                  <Tile
                    key={`${xIndex},${yIndex}`}
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

    return gridWithTiles;
  }
}

export default Grid;
