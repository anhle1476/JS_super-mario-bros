import Entity from "../Entity.js";
import { GAME_CONST } from "../../../math/gameConst.js";

export default class Mario extends Entity {
  constructor(spriteSheet, posX, posY, velX, velY) {
    super(spriteSheet, "idle", posX, posY, velX, velY, 1, 1);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.y += GAME_CONST.GRAVITY;
  }
}
