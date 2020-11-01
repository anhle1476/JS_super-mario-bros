import Object from "../Object.js";
import { COLLISION } from "../../../math/collision.js";

import { normalCollide } from "../../../controller/collision/collideBehaviour.js";

export default class Unbreakable extends Object {
  constructor(spriteSheet, name, posX, posY, width, height) {
    super(spriteSheet, name, posX, posY, width, height);
  }

  collide(collisionDirection, entity) {
    switch (collisionDirection) {
      case COLLISION.TOP:
        normalCollide.top(this, entity);
        break;
      case COLLISION.BOTTOM:
        normalCollide.bottom(this, entity);
        break;
      case COLLISION.RIGHT:
        normalCollide.right(this, entity);
        break;
      case COLLISION.LEFT:
        normalCollide.left(this, entity);
    }
  }
}
