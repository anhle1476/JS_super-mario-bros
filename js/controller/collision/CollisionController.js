import CollisionDetector from "./CollisionDetector.js";

import { COLLISION } from "../../math/collision.js";
import {
  getMarioPosition,
  getMinionPosition,
  getObstaclePosition,
} from "./collideUtilities.js";

export default class CollisionController {
  constructor(mario, game, audioController) {
    this.mario = mario;
    this.detector = new CollisionDetector(game, audioController);
    this.unbreakable = [];
    this.breakable = [];
    this.minions = [];
  }

  addSet(originalSet, newSet) {
    originalSet.push(...newSet);
  }

  addUnbreakableSet(objectsSet) {
    this.addSet(this.unbreakable, objectsSet);
  }

  addBreakableSet(objectsSet) {
    this.addSet(this.breakable, objectsSet);
  }

  addMinionsSet(objectsSet) {
    this.addSet(this.minions, objectsSet);
  }

  run() {
    this.marioCollisionDetect();
    this.minionsCollisionDetect();
  }

  updateMarioPosition() {
    this.marioPosition = getMarioPosition(this.mario);
  }

  marioCollisionDetect() {
    if (!this.mario.isAlive) return;
    this.updateMarioPosition();

    let isJumping = true;

    // for Unbreakable Object
    this.unbreakable.forEach((object) => {
      if (this.handleCollisionAndReturnIsJump(object)) isJumping = false;
    });

    // for Breakable Object
    let removeIndex = -1;

    this.breakable.forEach((object, index) => {
      if (!object.isExist) return (removeIndex = index);
      if (this.handleCollisionAndReturnIsJump(object)) isJumping = false;
    });

    this.removeUnusedSetItem(this.breakable, removeIndex);

    // for minions
    removeIndex = -1;

    this.minions.forEach((minion, index) => {
      if (!minion.isActive) return;
      if (!minion.isAlive) return (removeIndex = index);
      this.handleMarioCollision(minion, getMinionPosition(minion));
    });

    this.removeUnusedSetItem(this.minions, removeIndex);

    this.mario.isJump = isJumping;
  }

  minionsCollisionDetect() {
    for (const minion of this.minions) {
      if (!minion.isActive) continue;

      const minionPosition = getMinionPosition(minion);

      this.handleMinionCollideWithObstacleSet(
        this.unbreakable,
        minion,
        minionPosition
      );

      this.handleMinionCollideWithObstacleSet(
        this.breakable,
        minion,
        minionPosition
      );
    }
  }

  handleMinionCollideWithObstacleSet(obstaclesSet, minion, minionPosition) {
    obstaclesSet.forEach((obstacle) =>
      this.detector.getCollideStates(
        minion,
        minionPosition,
        obstacle,
        getObstaclePosition(obstacle)
      )
    );
  }

  handleCollisionAndReturnIsJump(object) {
    return (
      this.handleMarioCollision(object, getObstaclePosition(object)) ===
      COLLISION.TOP
    );
  }

  handleMarioCollision(obstacle, obstaclePosition) {
    return this.detector.getCollideStates(
      this.mario,
      this.marioPosition,
      obstacle,
      obstaclePosition
    );
  }

  removeUnusedSetItem(set, removeIndex) {
    if (removeIndex >= 0) {
      set.splice(removeIndex, 1);
    }
  }
}
