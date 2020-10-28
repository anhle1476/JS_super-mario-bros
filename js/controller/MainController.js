export default class MainController {
  constructor(
    game,
    compositor,
    updateController,
    collisionController,
    audioController
  ) {
    this.game = game;
    this.compositor = compositor;
    this.updateController = updateController;
    this.collisionController = collisionController;
    this.audioController = audioController;
  }

  update() {
    this.game.updateFrames(this.audioController);
    this.updateController.update(this.game, this.audioController);
    this.compositor.drawLayers(this.game);
    this.collisionController.run();
  }
}
