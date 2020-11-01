import { Vector, Size } from "../../math/characterizes.js";
import { createMultipleTilesBuffer } from "../../utilities/createBuffer.js";

export default class Object {
  constructor(spriteSheet, name, posX, posY, width, height) {
    this.name = name;
    this.pos = new Vector(posX, posY);
    this.size = new Size(width, height);
    this.buffer = this.createObjectBuffer(spriteSheet, name, width, height);
    this.rightSidePosX = this.pos.x + this.size.width;
  }

  createObjectBuffer(spriteSheet, name, width, height) {
    return createMultipleTilesBuffer(spriteSheet, name, width, height);
  }

  draw(ctx, base) {
    if (this.isOutOfDrawingRange(base)) return;
    ctx.drawImage(this.buffer, (this.pos.x - base) * 16, this.pos.y * 16);
  }

  isOutOfDrawingRange(base) {
    return this.pos.x > base + 25.5 || this.rightSidePosX < base - 0.5;
  }
}
