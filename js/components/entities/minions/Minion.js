import Entity from "../Entity.js";

export default class Minion extends Entity {
  constructor(spriteSheet, name, posX, posY, velX, velY, width, height) {
    super(spriteSheet, name, posX, posY, velX, velY, width, height);
    this.isMario = false;
    this.isAlive = true;
  }
}
