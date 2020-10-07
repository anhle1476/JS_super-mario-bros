import { Vector, Size } from "../../math/Characterizes.js";
import { createBuffer } from "../../utilities/createBuffer.js";

export default class Entity {
  constructor(spriteSheet, name, posX, posY, velX, velY, width, height) {
    this.spriteSheet = spriteSheet;
    this.name = name;
    this.pos = new Vector(posX, posY);
    this.vel = new Vector(velX, velY);
    this.size = new Size(width, height);
    this.buffer = this.createEntityBuffer(width, height);
  }

  createEntityBuffer(width, height) {
    const [buffer, context] = createBuffer(width * 16, height * 16);
    this.spriteSheet.drawTile(this.name, context, 0, 0);
    return buffer;
  }

  draw(ctx) {
    ctx.drawImage(this.buffer, this.pos.x * 16, this.pos.y * 16);
  }
}
