import { Vector, Size } from "../../math/characterizes.js";

export default class Entity {
  constructor(spriteSheet, name, posX, posY, velX, velY, width, height) {
    this.spriteSheet = spriteSheet;
    this.name = name;
    this.pos = new Vector(posX, posY);
    this.vel = new Vector(velX, velY);
    this.size = new Size(width, height);
    this.isActive = true;
  }

  _updateIsActive(base) {
    this.isActive = this.pos.x > base - 5 && this.pos.x < base + 25;
  }

  draw(ctx, base) {
    if (this.isActive) {
      this.spriteSheet.drawAnimation(
        this.name,
        ctx,
        this.state,
        this.pos.x - base,
        this.pos.y
      );
    }
  }
}
