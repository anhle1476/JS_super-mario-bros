import Minion from "../Minion.js";

export default class MushroomMinion extends Minion {
  constructor(spriteSheet, posX, posY) {
    super(spriteSheet, "doctor", posX, posY, 0, 0, 1, 1.5);
    this.state = 1;
  }

  update(base) {
    this._updateIsActive(base);
  }

  collide(direction, entity, game, audioController) {
    if (!entity.isMario) return;
    if (!entity.isNormal) return;

    game.win(audioController);
    entity.isNormal = false;
  }
}
