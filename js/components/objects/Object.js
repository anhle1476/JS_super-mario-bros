import { Vector, Size } from "../../math/characterizes.js";
import { createMultipleTilesBuffer } from "../../utilities/createBuffer.js";

export default class Object {
  constructor(spriteSheet, name, posX, posY, width, height) {
    this.name = name;
    this.pos = new Vector(posX, posY);
    this.size = new Size(width, height);
    this.buffer = this.createObjectBuffer(spriteSheet, name, width, height);
  }

  createObjectBuffer(spriteSheet, name, width, height) {
    return createMultipleTilesBuffer(spriteSheet, name, width, height);
  }

  draw(ctx, base) {
    ctx.drawImage(this.buffer, (this.pos.x - base) * 16, this.pos.y * 16);
  }
}
