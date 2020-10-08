import Object from "./Object.js";
import { DIRECTION } from "../../math/direction.js";
import { GAME_CONST } from "../../math/gameConst.js";

export default class Unbreakable extends Object {
  constructor(spriteSheet, name, posX, posY, width, height) {
    super(spriteSheet, name, posX, posY, width, height);
  }

  collide(direction, entity) {
    switch (direction) {
      case DIRECTION.TOP:
        entity.pos.y = this.pos.y - 1;
        entity.vel.y = -GAME_CONST.GRAVITY;
        break;
      case DIRECTION.BOTTOM:
        entity.pos.y = this.pos.y + this.size.height;
        entity.vel.y = 0;
        break;
      case DIRECTION.RIGHT:
        entity.pos.x = this.pos.x + this.size.width;
        entity.vel.y = 0;
        entity.vel.x = 0;
        break;
      case DIRECTION.LEFT:
        entity.pos.x = this.pos.x - 1;
        entity.vel.y = 0;
        entity.vel.x = 0;
        break;
      default:
        console.log("inside");
    }
  }
}
