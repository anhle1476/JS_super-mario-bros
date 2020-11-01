import Breakable from '../Breakable.js'

export default class Brick extends Breakable {
  constructor(spriteSheet, posX, posY) {
    super(spriteSheet, 'brick', posX, posY, 1, 1);
  }
}