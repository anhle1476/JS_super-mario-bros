import { Vector, Size } from "../../math/characterizes.js";

export default class Entity {
  constructor(spriteSheet, name, posX, posY, velX, velY, width, height) {
    this.spriteSheet = spriteSheet;
    this.name = name;
    this.pos = new Vector(posX, posY);
    this.vel = new Vector(velX, velY);
    this.size = new Size(width, height);
  }
}
