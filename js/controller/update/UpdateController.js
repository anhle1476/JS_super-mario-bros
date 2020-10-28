export default class UpdateController {
  constructor(viewPort) {
    this.viewPort = viewPort;
    this.entities = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  update(game, audioController) {
    this.viewPort.update();

    let removeIndex = -1;
    this.entities.forEach((entity, i) => {
      entity.update(this.viewPort.base);
      if (entity.pos.y > 17) {
        removeIndex = i;
      }
    });

    if (removeIndex >= 0) {
      const removed = this.entities.splice(removeIndex, 1);
      if (removed[0].name === "mario") {
        if (removed[0].isAlive) audioController.playDie();
        game.gameOver(audioController);
      }
    }
  }
}
