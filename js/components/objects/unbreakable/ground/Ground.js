import Unbreakable from "../Unbreakable.js";

export default class Ground extends Unbreakable {
  constructor(spriteSheet, posX, posY, width, height) {
    super(spriteSheet, "ground", posX, posY, width, height);
  }
}
