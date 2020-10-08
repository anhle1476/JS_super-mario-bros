import { DIRECTION } from "../../math/direction.js";

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

    for (const obstacle of this.obstacles) {
      const [obsX0, obsY0, obsX1, obsY1] = this.getObsPosition(obstacle);

      if (entY1 < obsY0 || entY0 > obsY1 || entX1 < obsX0 || entX0 > obsX1) {
        continue;
      }

      if (entY1 - obsY0 < 0.1) {
        console.log("top");
        obstacle.collide(DIRECTION.TOP, this.entity);
        continue;
      }

      if (obsY1 - entY0 < 0.1) {
        console.log("bottom");
        obstacle.collide(DIRECTION.BOTTOM, this.entity);
        continue;
      }

      if (entX1 - obsX0 < 0.1) {
        console.log("left");
        obstacle.collide(DIRECTION.LEFT, this.entity);
        continue;
      }

      if (obsX1 - entX0 < 0.1) {
        console.log("right");
        obstacle.collide(DIRECTION.RIGHT, this.entity);
        continue;
      }

      console.log("inside");
    }
  }
}
