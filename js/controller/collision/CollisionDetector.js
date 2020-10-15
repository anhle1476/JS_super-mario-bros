import { COLLISION } from "../../math/collision.js";

export default class CollisionDetector {
  constructor(mario) {
    this.mario = mario;
    this.unbreakable = [];
    this.breakable = [];
    this.minions = [];
  }

  addUnbreakableSet(objectsSet) {
    this.unbreakable = [...this.unbreakable, ...objectsSet];
  }

  addBreakableSet(objectsSet) {
    this.breakable = [...this.breakable, ...objectsSet];
  }

  addMinionsSet(objectsSet) {
    this.minions = [...this.minions, ...objectsSet];
  }

  getEntPosition(ent) {
    return [
      ent.pos.x + 0.1,
      ent.pos.y + 1 - ent.size.height,
      ent.pos.x + ent.size.width - 0.1,
      ent.pos.y + ent.size.height,
    ];
  }

  run() {
    this.marioCollisionDetect();
    this.minionsCollisionDetect();
  }

  getObsPosition(obs) {
    return [
      obs.pos.x,
      obs.pos.y,
      obs.pos.x + obs.size.width,
      obs.pos.y + obs.size.height,
    ];
  }

  detectCollideReturnIsJump(
    [entX0, entY0, entX1, entY1],
    [obsX0, obsY0, obsX1, obsY1],
    entity,
    obstacle
  ) {
    if (entY1 < obsY0 || entY0 > obsY1 || entX1 < obsX0 || entX0 > obsX1) {
      return true;
    }

    if (entY1 - obsY0 > 0.1) {
      if (entX1 - obsX0 < 0.15) {
        // console.log(entity.name, "left");
        obstacle.collide(COLLISION.LEFT, entity);
        return true;
      }

      if (obsX1 - entX0 < 0.15) {
        // console.log(entity.name, "right");
        obstacle.collide(COLLISION.RIGHT, entity);
        return true;
      }
    }

    if (obsY1 - entY0 < 0.5) {
      // console.log(entity.name, "bottom");
      obstacle.collide(COLLISION.BOTTOM, entity);
      return true;
    }
    // console.log(entity.name, "top");
    obstacle.collide(COLLISION.TOP, entity);
    return false;
  }

  marioCollisionDetect() {
    if (!this.mario.isAlive) return;
    const entPosition = this.getEntPosition(this.mario);

    let isJumping = true;

    // for Unbreakable Object
    this.unbreakable.forEach((object) => {
      if (
        !this.detectCollideReturnIsJump(
          entPosition,
          this.getObsPosition(object),
          this.mario,
          object
        )
      )
        isJumping = false;
    });

    // for Breakable Object
    let removeIndex = -1;

    this.breakable.forEach((object, index) => {
      if (object.isExist) {
        if (
          !this.detectCollideReturnIsJump(
            entPosition,
            this.getObsPosition(object),
            this.mario,
            object
          )
        )
          isJumping = false;
      } else {
        removeIndex = index;
      }
    });

    if (removeIndex >= 0) {
      this.breakable.splice(removeIndex, 1);
    }

    // for minions
    removeIndex = -1;

    this.minions.forEach((minion, index) => {
      if (minion.isAlive) {
        this.detectCollideReturnIsJump(
          entPosition,
          this.getEntPosition(minion),
          this.mario,
          minion
        );
      } else {
        removeIndex = index;
      }
    });

    if (removeIndex >= 0) {
      this.minions.splice(removeIndex, 1);
    }

    this.mario.isJump = isJumping;
  }

  minionsCollisionDetect() {
    for (const minion of this.minions) {
      const minionPosition = this.getEntPosition(minion);

      this.unbreakable.forEach((object) =>
        this.detectCollideReturnIsJump(
          minionPosition,
          this.getObsPosition(object),
          minion,
          object
        )
      );

      this.breakable.forEach((object) =>
        this.detectCollideReturnIsJump(
          minionPosition,
          this.getObsPosition(object),
          minion,
          object
        )
      );
    }
  }
}
