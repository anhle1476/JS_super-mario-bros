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

  updateEntityData([entTop, entLeft, entBottom, entRight]) {
    this.entTop = entTop;
    this.entLeft = entLeft;
    this.entBottom = entBottom;
    this.entRight = entRight;
  }

  updateObstacleData([obsTop, obsLeft, obsBottom, obsRight]) {
    this.obsTop = obsTop;
    this.obsLeft = obsLeft;
    this.obsBottom = obsBottom;
    this.obsRight = obsRight;
  }

  isOutOfRange() {
    return (
      this.entRight < this.obsLeft ||
      this.entLeft > this.obsRight ||
      this.entBottom < this.obsTop ||
      this.entTop > this.obsBottom
    );
  }

  getCollideDirection() {
    if (this.isUnderTopLimit()) {
      if (this.isCollideLeft()) return COLLISION.LEFT;
      if (this.isCollideRight()) return COLLISION.RIGHT;
    }
    return this.isCollideBottom() ? COLLISION.BOTTOM : COLLISION.TOP;
  }

  handleCollide(entity, obstacle, direction) {
    obstacle.collide(direction, entity, this.game, this.audioController);
  }

  isUnderTopLimit() {
    return this.entRight - this.obsLeft > INNER_LIMIT.TOP;
  }

  isCollideLeft() {
    return this.entBottom - this.obsTop < INNER_LIMIT.SIDES;
  }

  isCollideRight() {
    return this.obsBottom - this.entTop < INNER_LIMIT.SIDES;
  }

  isCollideBottom() {
    return this.obsRight - this.entLeft < INNER_LIMIT.BOTTOM;
  }
}
