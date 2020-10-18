import { Vector, Size } from "../../../math/characterizes.js";
import { createSingleTileBuffer } from "../../../utilities/createBuffer.js";

export default class Misc {
  constructor(spriteSheet, name, posX, posY, width, height) {
    this.name = name;
    this.pos = new Vector(posX, posY);
    this.size = new Size(width, height);
    this.buffer = createSingleTileBuffer(spriteSheet, name, width, height);
  }

  draw(ctx, base) {
    ctx.drawImage(this.buffer, (this.pos.x - base) * 16, this.pos.y * 16);
  }
}
