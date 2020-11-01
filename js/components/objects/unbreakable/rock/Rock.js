import Unbreakable from "../Unbreakable.js";

export default class Rock extends Unbreakable {
  constructor(spriteSheet, posX, posY, width, height) {
    super(spriteSheet, "rock", posX, posY, width, height);
  }
}
