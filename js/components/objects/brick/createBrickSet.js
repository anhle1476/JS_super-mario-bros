import Brick from './Brick.js'

export const createBrickSet = (spriteSheet, bricksPos) => {
  return bricksPos.map(pos => new Brick(spriteSheet, pos[0], pos[1]))
}