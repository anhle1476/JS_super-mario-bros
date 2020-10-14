import Entity from "../Entity.js";
import { GAME_CONST } from "../../../math/gameConst.js";
import { DIRECTION, ACTION } from "../../../math/entityState.js";

export default class Mario extends Entity {
  constructor(spriteSheet, posX, posY, velX, velY) {
    super(spriteSheet, "mario", posX, posY, velX, velY, 1, 1);

    this.direction = DIRECTION.RIGHT;
    this.action = ACTION.IDLE;
    this.isJump = false;
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
  }

  draw(ctx, base) {
    let currentState = this.direction;

    if (this.isJump) {
      currentState += 3;
    } else if (this.action === ACTION.MOVE) {
      currentState += 1;
      // case: change direction but velocity still move to other side -> drift
      if (
        (this.direction === DIRECTION.RIGHT && this.vel.x < 0) ||
        (this.direction === DIRECTION.LEFT && this.vel.x > 0)
      ) {
        currentState += 1;
      }
    }

    this.spriteSheet.drawAnimation(
      this.name,
      ctx,
      currentState,
      this.pos.x - base,
      this.pos.y
    );
  }
}
