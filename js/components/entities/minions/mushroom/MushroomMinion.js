import Minion from "../Minion.js";
import { GAME_CONST } from "../../../../math/gameConst.js";
import { DIRECTION, ACTION } from "../../../../math/entityState.js";
import { minionCollide } from "../../../../controller/collision/collideBehaviour.js";
import { COLLISION } from "../../../../math/collision.js";

export default class MushroomMinion extends Minion {
  constructor(spriteSheet, posX, posY) {
    super(spriteSheet, "mushroom-minion", posX, posY, 0.01, 0, 1, 1);

    this.direction = DIRECTION.RIGHT;
    this.action = ACTION.MOVE;
    this.state = this._getCurrentState();
  }

  update(base) {
    this._updateIsActive(base);
    if (!this.isActive) return;
    this.vel.y += GAME_CONST.GRAVITY;
    this.pos.y += this.vel.y;

    if (this.isActive && this.action === ACTION.MOVE) {
      this.vel.x = this.direction === DIRECTION.RIGHT ? 0.02 : -0.02;
      this.pos.x += this.vel.x;
    }

    this.state = this._getCurrentState();
  }

  changeDirection() {
    this.direction =
      this.direction === DIRECTION.RIGHT ? DIRECTION.LEFT : DIRECTION.RIGHT;
  }

  _getCurrentState() {
    return this.isAlive ? 1 : 0;
  }

  collide(collisionDirection, entity, game, audioController) {
    switch (collisionDirection) {
      case COLLISION.TOP:
        this.isAlive = false;
        this.vel.y -= 0.3;
        game.scoreKillMinion();
        audioController.playStomp();
        minionCollide.top(this, entity);
        break;
      case COLLISION.BOTTOM:
        minionCollide.bottom(this, entity);
        break;
      case COLLISION.RIGHT:
        minionCollide.right(this, entity);
        break;
      case COLLISION.LEFT:
        minionCollide.left(this, entity);
    }
  }
}
