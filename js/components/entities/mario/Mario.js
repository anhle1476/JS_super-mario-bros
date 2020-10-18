import Entity from "../Entity.js";
import { GAME_CONST } from "../../../math/gameConst.js";
import { DIRECTION, ACTION } from "../../../math/entityState.js";

export default class Mario extends Entity {
  constructor(spriteSheet, audioController) {
    super(spriteSheet, "mario", 2, 12, 0, 0, 1, 1);
    this.audioController = audioController;
    this.init();
  }

  init() {
    this.isMario = true;
    this.isAlive = true;
    this.isJump = false;
    this.isNormal = true;

    this.direction = DIRECTION.RIGHT;
    this.action = ACTION.IDLE;
    this.state = this._getCurrentState();
  }

  reset() {
    this.pos.x = 2;
    this.pos.y = 12;
    this.vel.x = 0;
    this.vel.y = 0;

    this.init();
  }

  update() {
    this.vel.y += GAME_CONST.GRAVITY;
    this.pos.y += this.vel.y;

    if (this.action === ACTION.MOVE) {
      // move right & < max velX
      if (this.direction === DIRECTION.RIGHT && this.vel.x < 0.13) {
        this.vel.x += 0.015;
      }
      // move left & < max velX
      if (this.direction === DIRECTION.LEFT && this.vel.x > -0.13) {
        this.vel.x -= 0.015;
      }
    } else {
      // stop running (moving to idle)
      this.vel.x += this.vel.x > 0 ? -0.015 : 0.015;
      if (Math.abs(this.vel.x) <= 0.015) {
        this.vel.x = 0;
      }
    }

    this.pos.x += this.vel.x;
    if (this.pos.x > 211) this.pos.x = 211;
    this.state = this._getCurrentState();
  }

  _getCurrentState() {
    if (!this.isAlive) return ACTION.DIE;
    let currentState = this.direction + (this.isNormal ? 0 : 200);

    if (this.isJump) {
      currentState += 3;
    } else if (this.isNormal && this.action === ACTION.MOVE) {
      currentState += 1;
      // case: change direction but velocity still move to other side -> drift
      if (
        (this.direction === DIRECTION.RIGHT && this.vel.x < 0) ||
        (this.direction === DIRECTION.LEFT && this.vel.x > 0)
      ) {
        currentState += 1;
      }
    }

    return currentState;
  }

  die() {
    this.isAlive = false;
    this.audioController.playDie();
  }
}
