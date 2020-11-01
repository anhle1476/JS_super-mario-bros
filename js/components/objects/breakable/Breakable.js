import Object from "../Object.js";
import { COLLISION } from "../../../math/collision.js";

import { normalCollide } from "../../../controller/collision/collideBehaviour.js";

export default class Breakable extends Object {
  constructor(spriteSheet, name, posX, posY, width, height) {
    super(spriteSheet, name, posX, posY, width, height);
    this.isExist = true;
  }

  collide(collisionDirection, entity, game, audioController) {
    switch (collisionDirection) {
      case COLLISION.TOP:
        normalCollide.top(this, entity);
        break;
      case COLLISION.BOTTOM:
        normalCollide.bottom(this, entity);
        audioController.playBreak();
        this.isExist = false;
        break;
      case COLLISION.RIGHT:
        normalCollide.right(this, entity);
        break;
      case COLLISION.LEFT:
        normalCollide.left(this, entity);
    }
  }

  draw(ctx, base) {
    if (this.isExist) {
      ctx.drawImage(this.buffer, (this.pos.x - base) * 16, this.pos.y * 16);
    }
  }
}
