import Object from "../Object.js";

export default class Sky extends Object {
  constructor(spriteSheet, posX, posY, width, height) {
    super(spriteSheet, "sky", posX, posY, width, height);
  }
}
