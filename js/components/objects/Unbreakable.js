import Object from "./Object.js";
import { COLLISION } from "../../math/collision.js";

import {
  normalCollideTop,
  normalCollideBottom,
  normalCollideLeft,
  normalCollideRight,
} from "../../controller/collision/collideBehaviour.js";

export default class Unbreakable extends Object {
  constructor(spriteSheet, name, posX, posY, width, height) {
    super(spriteSheet, name, posX, posY, width, height);
  }

  collide(collisionDirection, entity) {
    switch (collisionDirection) {
      case COLLISION.TOP:
        normalCollideTop(this, entity);
        break;
      case COLLISION.BOTTOM:
        normalCollideBottom(this, entity);
        break;
      case COLLISION.RIGHT:
        normalCollideRight(this, entity);
        break;
      case COLLISION.LEFT:
        normalCollideLeft(this, entity);
    }
  }
}
