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

  getMarioPosition(ent) {
    return [
      ent.pos.x + 0.1,
      ent.pos.y + 1 - ent.size.height,
      ent.pos.x + ent.size.width - 0.1,
      ent.pos.y + ent.size.height,
    ];
  }

  getEntPosition(ent) {
    return [
      ent.pos.x,
      ent.pos.y + 1 - ent.size.height,
      ent.pos.x + ent.size.width,
      ent.pos.y + ent.size.height,
    ];
  }

  run(game, audioController) {
    this.marioCollisionDetect(game, audioController);
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
    obstacle,
    game,
    audioController
  ) {
    if (entY1 < obsY0 || entY0 > obsY1 || entX1 < obsX0 || entX0 > obsX1) {
      return true;
    }

    if (entY1 - obsY0 > 0.1) {
      if (entX1 - obsX0 < 0.15) {
        obstacle.collide(COLLISION.LEFT, entity, game, audioController);
        return true;
      }

      if (obsX1 - entX0 < 0.15) {
        obstacle.collide(COLLISION.RIGHT, entity, game, audioController);
        return true;
      }
    }

    if (obsY1 - entY0 < 0.5) {
      obstacle.collide(COLLISION.BOTTOM, entity, game, audioController);
      return true;
    }
    obstacle.collide(COLLISION.TOP, entity, game, audioController);
    return false;
  }

  marioCollisionDetect(game, audioController) {
    if (!this.mario.isAlive) return;
    const marioPosition = this.getMarioPosition(this.mario);

    let isJumping = true;

    // for Unbreakable Object
    this.unbreakable.forEach((object) => {
      if (
        !this.detectCollideReturnIsJump(
          marioPosition,
          this.getObsPosition(object),
          this.mario,
          object,
          game,
          audioController
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
            marioPosition,
            this.getObsPosition(object),
            this.mario,
            object,
            game,
            audioController
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
      if (minion.isActive) {
        if (minion.isAlive) {
          this.detectCollideReturnIsJump(
            marioPosition,
            this.getEntPosition(minion),
            this.mario,
            minion,
            game,
            audioController
          );
        } else {
          removeIndex = index;
        }
      }
    });

    if (removeIndex >= 0) {
      this.minions.splice(removeIndex, 1);
    }

    this.mario.isJump = isJumping;
  }

  minionsCollisionDetect() {
    for (const minion of this.minions) {
      if (!minion.isActive) continue;

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
