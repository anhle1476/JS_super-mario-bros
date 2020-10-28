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

  _addSet(originalSet, newSet) {
    originalSet.push(...newSet);
  }

  addUnbreakableSet(objectsSet) {
    this._addSet(this.unbreakable, objectsSet);
  }

  addBreakableSet(objectsSet) {
    this._addSet(this.breakable, objectsSet);
  }

  addMinionsSet(objectsSet) {
    this._addSet(this.minions, objectsSet);
  }

  run() {
    this._marioCollisionDetect();
    this._minionsCollisionDetect();
  }

  _updateMarioPosition() {
    this.marioPosition = getMarioPosition(this.mario);
  }

  _marioCollisionDetect() {
    if (!this.mario.isAlive) return;
    this._updateMarioPosition();

    let isJumping = true;

    // for Unbreakable Object
    this.unbreakable.forEach((object) => {
      if (this._handleCollisionAndReturnIsJump(object)) isJumping = false;
    });

    // for Breakable Object
    let removeIndex = -1;

    this.breakable.forEach((object, index) => {
      if (!object.isExist) return (removeIndex = index);
      if (this._handleCollisionAndReturnIsJump(object)) isJumping = false;
    });

    this._removeUnusedSetItem(this.breakable, removeIndex);

    // for minions
    removeIndex = -1;

    this.minions.forEach((minion, index) => {
      if (!minion.isActive) return;
      if (!minion.isAlive) return (removeIndex = index);
      this._handleMarioCollision(minion, getMinionPosition(minion));
    });

    this._removeUnusedSetItem(this.minions, removeIndex);

    this.mario.isJump = isJumping;
  }

  _minionsCollisionDetect() {
    for (const minion of this.minions) {
      if (!minion.isActive) continue;

      const minionPosition = getMinionPosition(minion);

      this._handleMinionCollideWithObstacleSet(
        this.unbreakable,
        minion,
        minionPosition
      );

      this._handleMinionCollideWithObstacleSet(
        this.breakable,
        minion,
        minionPosition
      );
    }
  }

  _handleMinionCollideWithObstacleSet(obstaclesSet, minion, minionPosition) {
    obstaclesSet.forEach((obstacle) =>
      this.detector.getCollideStates(
        minion,
        minionPosition,
        obstacle,
        getObstaclePosition(obstacle)
      )
    );
  }

  _handleCollisionAndReturnIsJump(object) {
    return (
      this._handleMarioCollision(object, getObstaclePosition(object)) ===
      COLLISION.TOP
    );
  }

  _handleMarioCollision(obstacle, obstaclePosition) {
    return this.detector.getCollideStates(
      this.mario,
      this.marioPosition,
      obstacle,
      obstaclePosition
    );
  }

  _removeUnusedSetItem(set, removeIndex) {
    if (removeIndex >= 0) {
      set.splice(removeIndex, 1);
    }
  }
}
