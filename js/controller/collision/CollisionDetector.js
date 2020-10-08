import { COLLISION } from "../../math/collision.js";

export default class CollisionDetector {
  constructor(entity) {
    this.setEntity(entity);
    this.obstacles = [];
  }

  setEntity(entity) {
    this.entity = entity;
  }

  addObstacles(obstacle) {
    this.obstacles.push(obstacle);
  }

  getEntPosition(mario) {
    return [
      mario.pos.x,
      mario.pos.y + 1 - mario.size.height,
      mario.pos.x + mario.size.width,
      mario.pos.y + mario.size.height,
    ];
  }

  getObsPosition(obs) {
    return [
      obs.pos.x,
      obs.pos.y,
      obs.pos.x + obs.size.width,
      obs.pos.y + obs.size.height,
    ];
  }

  run() {
    const [entX0, entY0, entX1, entY1] = this.getEntPosition(this.entity);

    let isJumping = true;

    for (const obstacle of this.obstacles) {
      const [obsX0, obsY0, obsX1, obsY1] = this.getObsPosition(obstacle);

      if (entY1 < obsY0 || entY0 > obsY1 || entX1 < obsX0 || entX0 > obsX1) {
        continue;
      }

      if (obsY1 - entY0 < 0.1) {
        console.log("bottom");
        obstacle.collide(COLLISION.BOTTOM, this.entity);
        continue;
      }

      if (entX1 - obsX0 < 0.1) {
        console.log("left");
        obstacle.collide(COLLISION.LEFT, this.entity);
        continue;
      }

      if (obsX1 - entX0 < 0.1) {
        console.log("right");
        obstacle.collide(COLLISION.RIGHT, this.entity);
        continue;
      }

      obstacle.collide(COLLISION.TOP, this.entity);
      isJumping = false;
    }

    this.entity.isJump = isJumping;
  }
}
