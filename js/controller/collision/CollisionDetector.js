import { COLLISION } from "../../math/collision.js";

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
    this.updateEntityData(entityPosition);
    this.updateObstacleData(obstaclePosition);

    if (this.isOutOfRange()) return COLLISION.OUT_OF_RANGE;

    const collideDirection = this.getCollideDirection();
    this.handleCollide(entity, obstacle, collideDirection);
    return collideDirection;
  }

  updateEntityData([entX0, entY0, entX1, entY1]) {
    this.entX0 = entX0;
    this.entY0 = entY0;
    this.entX1 = entX1;
    this.entY1 = entY1;
  }

  updateObstacleData([obsX0, obsY0, obsX1, obsY1]) {
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
        return COLLISION.LEFT;
      }

      if (this.isCollideRight()) {
        return COLLISION.RIGHT;
      }
    }

    if (this.isCollideBottom()) {
      return COLLISION.BOTTOM;
    }

    return COLLISION.TOP;
  }

  handleCollide(entity, obstacle, direction) {
    obstacle.collide(direction, entity, this.game, this.audioController);
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
