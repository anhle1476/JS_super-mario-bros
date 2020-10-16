import { GAME_CONST } from "./math/gameConst.js";

export default class Timer {
  constructor(
    game,
    compositor,
    updateCenter,
    collisionDetector,
    audioController
  ) {
    this.game = game;
    this.compositor = compositor;
    this.updateCenter = updateCenter;
    this.collisionDetector = collisionDetector;
    this.audioController = audioController;

    this._accumulatedTime = 0;
    this._lastTime = 0;

    this.updateProxy = this.updateProxy.bind(this);
  }

  updateProxy(time) {
    this._accumulatedTime += (time - this._lastTime) / 1000;

    while (this._accumulatedTime > GAME_CONST.DELTA_TIME) {
      this._accumulatedTime -= GAME_CONST.DELTA_TIME;

      this.game.updateFrames(this.audioController);
      this.updateCenter.update(this.game, this.audioController);
      this.compositor.drawLayers(this.game);
      this.collisionDetector.run(this.game, this.audioController);
    }

    if (!this.game.isPlaying) return;

    this._lastTime = time;
    this.enqueue();
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
    this.audioController.playTheme();
  }

  getReady() {
    this.game.drawGameReady();

    const pressKeyToStart = ({ keyCode }) => {
      if (keyCode === 13) {
        this.start();
        document.removeEventListener("keydown", pressKeyToStart);
      }
    };

    document.addEventListener("keydown", pressKeyToStart);
  }
}
