import Object from "../Object.js";
import FlyUpCoin from "./FlyUpCoin.js";
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
    this.FlyUpCoin = new FlyUpCoin(spriteSheet, posX, posY);
    this.coins = 3;
  }

  nextBox() {
    this.coins--;
    this.name = "coin-box-" + this.coins;
    this.buffer = this.createObjectBuffer(this.spriteSheet, this.name, 1, 1);
  }

  collide(collisionDirection, entity) {
    switch (collisionDirection) {
      case COLLISION.TOP:
        normalCollideTop(this, entity);
        break;
      case COLLISION.BOTTOM:
        normalCollideBottom(this, entity);
        if (this.coins > 0) {
          this.nextBox();
        }
        break;
      case COLLISION.RIGHT:
        normalCollideRight(this, entity);
        break;
      case COLLISION.LEFT:
        normalCollideLeft(this, entity);
    }
  }

  draw(ctx, base) {
    const currentCoin = this.FlyUpCoin.currentCoin;
    if (currentCoin > 0) {
      this.FlyUpCoin.draw(ctx, base);
    }

    if (currentCoin > this.coins) {
      this.FlyUpCoin.flyUp();
    }

    ctx.drawImage(this.buffer, (this.pos.x - base) * 16, this.pos.y * 16);
  }
}
