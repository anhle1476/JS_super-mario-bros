import Object from "./Object.js";
import { COLLISION } from "../../math/collision.js";

import {
  normalCollideTop,
  normalCollideBottom,
  normalCollideLeft,
  normalCollideRight,
} from "../../controller/collision/collideBehaviour.js";

export default class Breakable extends Object {
  constructor(spriteSheet, name, posX, posY, width, height) {
    super(spriteSheet, name, posX, posY, width, height);
    this.isExist = true;
  }

  collide(collisionDirection, entity) {
    switch (collisionDirection) {
      case COLLISION.TOP:
        normalCollideTop(this, entity);
        break;
      case COLLISION.BOTTOM:
        normalCollideBottom(this, entity);
        this.isExist = false;
        break;
      case COLLISION.RIGHT:
        normalCollideRight(this, entity);
        break;
      case COLLISION.LEFT:
        normalCollideLeft(this, entity);
    }
  }

  draw(ctx, base) {
    if (this.isExist) {
      ctx.drawImage(this.buffer, (this.pos.x - base) * 16, this.pos.y * 16);
    }
  }
}
