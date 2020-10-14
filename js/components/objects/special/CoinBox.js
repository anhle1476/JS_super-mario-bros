import Object from "../Object.js";
import { COLLISION } from "../../../math/collision.js";

import {
  normalCollideTop,
  normalCollideBottom,
  normalCollideLeft,
  normalCollideRight,
} from "../../../controller/collision/collideBehaviour.js";

export default class CoinBox extends Object {
  constructor(spriteSheet, posX, posY) {
    super(spriteSheet, "coin-box-3", posX, posY, 1, 1);
    this.spriteSheet = spriteSheet;
    this.coins = 3;
  }

  changeName() {
    this.name = "coin-box-" + this.coins;
  }

  collide(collisionDirection, entity) {
    switch (collisionDirection) {
      case COLLISION.TOP:
        normalCollideTop(this, entity);
        break;
      case COLLISION.BOTTOM:
        normalCollideBottom(this, entity);
        if (this.coins > 0) {
          this.coins--;
          this.changeName();
          this.buffer = this.createObjectBuffer(
            this.spriteSheet,
            this.name,
            1,
            1
          );
        }
        break;
      case COLLISION.RIGHT:
        normalCollideRight(this, entity);
        break;
      case COLLISION.LEFT:
        normalCollideLeft(this, entity);
    }
  }
}
