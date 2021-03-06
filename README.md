# React Snake

## Grid example

![Grid example](./grid_example.png)

## Game rules

- Snake starts at the middle of the grid and its size is 1
- Apples/food is placed randomly in the grid only one food per time
- The game ends when the snake crash into itself
- If the end of the grid is reached then the snake will appear in the opposite side

## What we need

- A game system that manages all the game logic
  - The snake length
  - Where the food is placed
  - When the games end
  - Moving the snake
- A grid system to display the tiles
- Coordinates system [(1,1), (4,5), ..., (x,y)]
- The snake direction N/S/E/W
- Snake current position
- A tile can either contain the food or the snake

## Component hierarchy

Game --> Grid --> Tile

# What to do

1. Create a empty grid and display coordinates
2. Each tile has to take two properties snake and food, accordingly add a HTML CSS class to display a dark background if is snake or a red one if is food
3. Move the snake and food management in the game component
