import { COLLISION } from "../../math/collision.js";
import {
  getMarioPosition,
  getMinionPosition,
  getObstaclePosition,
} from "./collideUtilities.js";

const INNER_LIMIT = {
  TOP: 0.1,
  SIDES: 0.15,
  BOTTOM: 0.5,
};

export default class CollisionDetector {
  constructor(game, audioController) {
    this.game = game;
    this.audioController = audioController;
  }

  getCollideStates(entity, entityPosition, obstacle, obstaclePosition) {
    this.updateEntityData(entity, entityPosition);
    this.updateObstacleData(obstacle, obstaclePosition);

    return this.isOutOfRange()
      ? COLLISION.OUT_OF_RANGE
      : this.getCollideDirection();
  }

  updateEntityData(entity, [entX0, entY0, entX1, entY1]) {
    this.entity = entity;

    this.entX0 = entX0;
    this.entY0 = entY0;
    this.entX1 = entX1;
    this.entY1 = entY1;
  }

  updateObstacleData(obstacle, [obsX0, obsY0, obsX1, obsY1]) {
    this.obstacle = obstacle;

    this.obsX0 = obsX0;
    this.obsY0 = obsY0;
    this.obsX1 = obsX1;
    this.obsY1 = obsY1;
  }

  isOutOfRange() {
    return (
      this.entY1 < this.obsY0 ||
      this.entY0 > this.obsY1 ||
      this.entX1 < this.obsX0 ||
      this.entX0 > this.obsX1
    );
  }

  getCollideDirection() {
    if (this.isUnderTopLimit()) {
      if (this.isCollideLeft()) {
        this.handleCollide(COLLISION.LEFT);
        return COLLISION.LEFT;
      }

      if (this.isCollideRight()) {
        this.handleCollide(COLLISION.RIGHT);
        return COLLISION.RIGHT;
      }
    }

    if (this.isCollideBottom()) {
      this.handleCollide(COLLISION.BOTTOM);
      return COLLISION.BOTTOM;
    }

    this.handleCollide(COLLISION.TOP);
    return COLLISION.TOP;
  }

  handleCollide(direction) {
    this.obstacle.collide(
      direction,
      this.entity,
      this.game,
      this.audioController
    );
  }

  isUnderTopLimit() {
    return this.entY1 - this.obsY0 > INNER_LIMIT.TOP;
  }

  isCollideLeft() {
    return this.entX1 - this.obsX0 < INNER_LIMIT.SIDES;
  }

  isCollideRight() {
    return this.obsX1 - this.entX0 < INNER_LIMIT.SIDES;
  }

  isCollideBottom() {
    return this.obsY1 - this.entY0 < INNER_LIMIT.BOTTOM;
  }
}
