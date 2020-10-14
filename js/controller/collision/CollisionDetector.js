import { COLLISION } from "../../math/collision.js";

export default class CollisionDetector {
  constructor(entity) {
    this.setEntity(entity);
    this.unbreakable = [];
    this.breakable = [];
  }

  setEntity(entity) {
    this.entity = entity;
  }

  addUnbreakableSet(objectsSet) {
    this.unbreakable = [...this.unbreakable, ...objectsSet];
  }

  addBreakableSet(objectsSet) {
    this.breakable = [...this.breakable, ...objectsSet];
  }

  getEntPosition(mario) {
    return [
      mario.pos.x,
      mario.pos.y + 1 - mario.size.height,
      mario.pos.x + mario.size.width,
      mario.pos.y + mario.size.height,
    ];
  }

  run() {
    const [entX0, entY0, entX1, entY1] = this.getEntPosition(this.entity);

    let isJumping = true;

    // for Unbreakable Object
    this.unbreakable.forEach((object) => {
      if (!this.detectCollideReturnIsJump(entX0, entY0, entX1, entY1, object))
        isJumping = false;
    });

    // for Breakable Object
    let removeIndex = -1;

    this.breakable.forEach((object, index) => {
      if (object.isExist) {
        if (!this.detectCollideReturnIsJump(entX0, entY0, entX1, entY1, object))
          isJumping = false;
      } else {
        removeIndex = index;
      }
    });

    if (removeIndex >= 0) {
      this.breakable.splice(removeIndex, 1);
    }

    this.entity.isJump = isJumping;
  }

  getObsPosition(obs) {
    return [
      obs.pos.x,
      obs.pos.y,
      obs.pos.x + obs.size.width,
      obs.pos.y + obs.size.height,
    ];
  }

  detectCollideReturnIsJump(entX0, entY0, entX1, entY1, obstacle) {
    const [obsX0, obsY0, obsX1, obsY1] = this.getObsPosition(obstacle);

    if (entY1 < obsY0 || entY0 > obsY1 || entX1 < obsX0 || entX0 > obsX1) {
      return true;
    }

    if (entY1 - obsY0 > 0.1) {
      if (entX1 - obsX0 < 0.1) {
        console.log("left");
        obstacle.collide(COLLISION.LEFT, this.entity);
        return true;
      }

      if (obsX1 - entX0 < 0.1) {
        console.log("right");
        obstacle.collide(COLLISION.RIGHT, this.entity);
        return true;
      }
    }

    if (obsY1 - entY0 < 0.5) {
      console.log("bottom");
      obstacle.collide(COLLISION.BOTTOM, this.entity);
      return true;
    }

    obstacle.collide(COLLISION.TOP, this.entity);
    return false;
  }
}
